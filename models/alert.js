const db = require('../config/bd');
class Alert {
  static async getAlert(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM inventory_alerts');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM inventory_alerts LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createAlert(alert) {
    
    const conn = await db.getConnection();
    const { product_id, threshold,alert_message }= alert;
    const [rows] = await conn.query(
      'INSERT INTO inventory_alerts ( product_id, threshold,alert_message ) VALUES (?,?,?)',
        [product_id, threshold,alert_message],
    );
    conn.release();
    return {data : rows};
  }
}
module.exports = Alert;