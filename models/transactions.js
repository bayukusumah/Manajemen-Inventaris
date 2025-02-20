const db = require('../config/bd');
class Transactions {
  static async getTransactions(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM transactions');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM transactions LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createTransactions(transactions) {
    
    const conn = await db.getConnection();
    const { product_id, user_id, type, quantity, total_price }= transactions;
    const [rows] = await conn.query(
      'INSERT INTO transactions (product_id, user_id, type, quantity, total_price) VALUES (?, ?,?,?,?)',
        [product_id, user_id, type, quantity, total_price],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Transactions;