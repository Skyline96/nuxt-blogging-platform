import bcrypt from "bcrypt";
import { initDB } from "../../db/database";

export default defineEventHandler(async (event) => {
  try {
    const { success, data } = await readValidatedBody(event, body => registerFormSchema.safeParse(body));

    if (!success) {
      console.error("Name, Username and password are required");
      return createError({
        statusCode: 400,
        statusMessage: "Name, Username and password are required",
      });
    }

    const db = await initDB(); // Initialize database connection
    const hashedPassword = await bcrypt.hash(data.password, 10); // Hash password

    // Insert user data into database
    try {
      await db.run("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", [
        data.name,
        data.email,
        hashedPassword,
      ]);
    } catch (error) {
      console.error("Error creating user:", error);
      return createError({
        statusCode: 409,
        statusMessage: "Email ID already exists",
      });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
});