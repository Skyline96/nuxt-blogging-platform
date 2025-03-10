import bcrypt from "bcrypt"
import { initDB } from "../../db/database"

export default defineEventHandler(async (event) => {
    try {
        const { success, data } = await readValidatedBody(event, body => loginFormSchema.safeParse(body));

        if (!success) {
            console.error("Username or password is missing");
            return createError({
                statusCode: 400,
                statusMessage: "Username or password is missing",
            });
        }

        // Connect to the database
        const db = await initDB();

        // Check if the user exist
        const user = await db.get("SELECT * FROM users WHERE username = ?", [
            data.email,
        ]);

        // For security reasons, do not specify if username or password is incorrect
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            console.error(`Invalid username or password`);

            return createError({
                statusCode: 401,
                statusMessage: "Invalid username or password",
            });
        } else {
            const userData = { id: user.id, name: user.name, username: user.username };

            await setUserSession(event, {
                user: userData,
                loggedInAt: new Date(),
            });
        }

        return { success: true, user };
    } catch (error) {
        console.error("Error handling login request:", error);

        return createError({
            statusCode: 500,
            statusMessage: "Failed to process request",
        });
    }
})
