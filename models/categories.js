const db = require('../config/bd');
class Categories {
  static async getCategories(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM categories');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM categories LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createCategories(categories) {
    
    const conn = await db.getConnection();
    const { name, description }= categories;
    const [rows] = await conn.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Categories;