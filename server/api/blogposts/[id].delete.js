import { initDB } from "../../db/database";

// Delete user's existing blogpost
export default defineEventHandler(async (event) => {
  try {
    const postId = event.context.params.id
    const { user } = await requireUserSession(event)

    const db = await initDB();

    // Delete the post
    try {
      await db.run("DELETE FROM blogposts WHERE id = ? AND user_id = ?", [postId, user.id]);
    } catch (error) {
      console.error("Error deleting blogpost:", error);
      return createError({
        statusCode: 409,
        statusMessage: "Unable to delete the blogpost",
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