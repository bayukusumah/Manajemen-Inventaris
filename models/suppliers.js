const db = require('../config/bd');
class Suppliers {
  static async getSuppliers(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM suppliers');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM suppliers LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createSuppliers(suppliers) {
    
    const conn = await db.getConnection();
    const { name, contact, email, address }= suppliers;
    const [rows] = await conn.query(
      'INSERT INTO suppliers (name, contact, email, address) VALUES (?, ?, ?, ?)',
        [name, contact, email, address],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Suppliers;