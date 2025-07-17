const pool = require('../database/pg')

class ProductModel {
  static async findById(id) {
    const result = await pool.query('SELECT * FROM product WHERE pid = $1', [id]);
    return result.rows[0];
    
  }

  static async findBySlug(slug) {
    const result = await pool.query('SELECT * FROM product WHERE slug = $1', [slug]);
    return result.rows[0];
  }

 static async create({ name, slug, quantity }) {
    const result = await pool.query(
      `INSERT INTO product (pid, name, slug, quantity)
       VALUES (gen_random_uuid(), $1, $2, $3)
       RETURNING *`,
      [name, slug, quantity]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM product WHERE pid = $1', [id]);
    return result.rowCount;
  }
    static async findAll() {
    const result = await pool.query('SELECT * from product');
    return result.rows;
  }

  static async update(id, { name, slug, quantity }) {
    const fields = [];
    const values = [];
    let i = 1;

    if (name) {
      fields.push(`name = $${i++}`);
      values.push(name);
    }

    if (slug) {
      const slugCheck = await pool.query(
        'SELECT * FROM product WHERE slug = $1 AND pid != $2',
        [slug, id]
      );
      if (slugCheck.rows.length > 0) 
        return {sucess: false, message: "This slug is already exists in another product"}

      fields.push(`slug = $${i++}`);
      values.push(slug);
    }

    if (quantity !== undefined) {
      fields.push(`quantity = $${i++}`);
      values.push(quantity);
    }

    if (fields.length === 0) return null;

    values.push(id); // push id last
    const result = await pool.query(
      `UPDATE product SET ${fields.join(', ')} WHERE pid = $${i} RETURNING *`,
      values
    );
    return {sucess: true, data: result.rows[0]}
  }
};

module.exports = ProductModel;
