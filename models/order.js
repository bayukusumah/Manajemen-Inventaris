const db = require('../config/bd');
class Order {
  static async getOrder(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM orders');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM orders LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createOrder(order) {
    
    const conn = await db.getConnection();
    const { supplier_id, user_id, status }= order;
    const [rows] = await conn.query(
      'INSERT INTO orders ( supplier_id, user_id, status) VALUES (?,?,?)',
        [supplier_id, user_id, status],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Order;