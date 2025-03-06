const db = require('../config/bd');
class OrderDetail {
  static async getOrderDetail(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM order_details');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM order_details LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createOrderDetail(order) {
    
    const conn = await db.getConnection();
    const { order_id, product_id, quantity,price }= order;
    const [rows] = await conn.query(
      'INSERT INTO order_details ( order_id, product_id, quantity,price ) VALUES (?,?,?,?)',
        [order_id, product_id, quantity,price ],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = OrderDetail;