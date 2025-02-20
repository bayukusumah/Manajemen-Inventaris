const db = require('../config/bd');
class Stock {
  static async getStock(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM stock_movements');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM stock_movements LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createStock(stock) {
    
    const conn = await db.getConnection();
    const {  product_id, transaction_id, previous_stock, new_stock }= stock;
    const [rows] = await conn.query(
      'INSERT INTO stock_movements ( product_id, transaction_id, previous_stock, new_stock) VALUES (?,?,?,?)',
        [product_id, transaction_id, previous_stock, new_stock],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Stock;