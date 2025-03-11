import { initDB } from "../../db/database";

// Create new blogpost
export default defineEventHandler(async (event) => {
  try {
    const { success, data } = await readValidatedBody(event, body => newBlogpostFormSchema.safeParse(body));

    if (!success) {
      console.error("Title and content are required");
      return createError({
        statusCode: 400,
        statusMessage: "Title and content are required",
      });
    }

    const db = await initDB(); // Initialize database connection

    // Insert user data into database
    try {
      await db.run("INSERT INTO blogposts (user_id, title, content) VALUES (?, ?, ?)", [
        data.user_id,
        data.title,
        data.content
      ]);
    } catch (error) {
      console.error("Error creating blogpost:", error);
      return createError({
        statusCode: 409,
        statusMessage: "Unable to create blogpost",
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