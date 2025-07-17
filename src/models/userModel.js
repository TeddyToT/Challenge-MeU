const pool = require("../database/pg");
const bcrypt = require("bcrypt");

class UserModel {
  static async findById(id) {
    const result = await pool.query("SELECT * FROM user WHERE uid = $1", [id]);
    return result.rows[0];
  }

    static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  static async create({ name, password, email, phone }) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `INSERT INTO users (name, password, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, passwordHash, email, phone]
    );
    return result.rows[0];
  }

  static async findNotDuplicate({ email, phone }) {
    if (email) {
      const emailCheck = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (emailCheck.rows.length > 0)
        return {
          success: false,
          message: "This email is already exists in another user",
        };

      return { success: true, massage: "This email is ready to use" };
    }

    if (phone) {
      const phoneCheck = await pool.query(
        "SELECT * FROM users WHERE phone = $1",
        [phone]
      );
      if (phoneCheck.rows.length > 0)
        return {
          success: false,
          message: "This phone is already exists in another user",
        };
      return { success: true, massage: "This phone number is ready to use" };
    }
  }

  static async findAll() {
    const result = await pool.query("SELECT * from user");
    return result.rows;
  }

  static async update(id, { name, email, phone }) {
    const fields = [];
    const values = [];
    let i = 1;

    if (name) {
      fields.push(`name = $${i++}`);
      values.push(name);
    }

    if (email) {
      const emailCheck = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND uid != $2",
        [email, id]
      );
      if (emailCheck.rows.length > 0)
        return {
          success: false,
          message: "This email is already exists in another user",
        };

      fields.push(`email = $${i++}`);
      values.push(email);
    }

    if (phone) {
      const phoneCheck = await pool.query(
        "SELECT * FROM users WHERE phone = $1 AND uid != $2",
        [phone, id]
      );
      if (phoneCheck.rows.length > 0)
        return {
          success: false,
          message: "This phone is already exists in another user",
        };

      fields.push(`phone = $${i++}`);
      values.push(phone);
    }

    if (fields.length === 0) return null;

    values.push(id); // push id last
    const result = await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE uid = $${i} RETURNING *`,
      values
    );
    return { success: true, data: result.rows[0] };
  }
}

module.exports = UserModel;
