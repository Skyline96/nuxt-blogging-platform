import { initDB } from "../../db/database";

// Return single blogpost according to dyanamic id passed in route params 
export default defineEventHandler(async (event) => {
  const postId = event.context.params.id
  const db = await initDB();

  const post = await db.get(`
      SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.created_at, 
             users.name AS author
      FROM blogposts
      JOIN users ON blogposts.user_id = users.id
      WHERE blogposts.id = ?
  `, [postId]);

  return post;
});