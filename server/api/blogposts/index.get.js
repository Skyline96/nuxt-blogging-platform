import { initDB } from "../../db/database";

export default defineEventHandler(async () => {
  const db = await initDB();
  const posts = await db.all(`
      SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.created_at, 
             users.name AS author
      FROM blogposts
      JOIN users ON blogposts.user_id = users.id
  `);
  return posts;
});