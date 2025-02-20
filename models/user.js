const db = require('../config/bd');
class User {
    static async getUsers(){
      const conn = await db.getConnection();
      const [rows] = await conn.query('SELECT * FROM users ORDER BY CODE ASC');
      conn.release();
      return {data : rows};
    }
    static async getAllUsers(page = 1, limit = 10) {
      const conn = await db.getConnection();
      const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM users');
      const total = totalCountRows[0].total;
      const pageOK = total / limit;
      const [rows] = await conn.query('SELECT * FROM users LIMIT ? OFFSET ?',[limit, offset]);
      conn.release();
      return {
        data: rows,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    }
  
    static async createUser(account) {
      const conn = await db.getConnection();
      const { username, email, password, role } = account;
      const [rows] = await conn.query('INSERT INTO users (username, email, password, role) VALUES (?, ?,?,?)', [username, email, password, role]);
      conn.release();
      return {data : rows};
    }
  }
  
  module.exports = User;