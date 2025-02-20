const db = require('../config/bd');


class Produk {
  static async getProduk(page = 1, limit = 20) {
    const conn = await db.getConnection();
    const offset = (page - 1) * limit;
      const [totalCountRows] = await conn.query('SELECT COUNT(*) as total FROM products');
      const total = totalCountRows[0].total;  
     const [rows] = await conn.query(`SELECT * FROM products LIMIT ? OFFSET ?`,[limit, offset]);
     conn.release();
      return {
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };     
  }

  static async createProduk(produk) {
    
    const conn = await db.getConnection();
    const { name, description, price, stock, category_id, supplier_id } = produk;
    const [rows] = await conn.query(
      'INSERT INTO products (name, description, price, stock, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id, supplier_id]
    );
    conn.release();
    return {data : rows};
  }
}

module.exports = Produk;
