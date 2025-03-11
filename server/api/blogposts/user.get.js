import { initDB } from "../../db/database";

// Return logged in user's blogposts
export default defineEventHandler(async (event) => {
  const db = await initDB();

  const { user } = await requireUserSession(event)

  const posts = await db.all(`
      SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.created_at, 
             users.name AS author
      FROM blogposts
      JOIN users ON blogposts.user_id = users.id
      WHERE blogposts.user_id = ?
  `, [user.id]);
  
  return posts;
});