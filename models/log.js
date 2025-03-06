const db = require('../config/bd');
class Log {
  static async getLog(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM logs');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM logs LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createLog(log) {
    
    const conn = await db.getConnection();
    const { user_id, action }= log;
    const [rows] = await conn.query(
      'INSERT INTO logs ( user_id, action ) VALUES (?,?)',
        [user_id, action ],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Log;