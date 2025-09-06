import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = (req, res) => {
  const { display_name, email, password, confirm_password } = req.body;
  if (!display_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) return res.status(400).json({ message: "Email already exists" });

    db.query(
      "INSERT INTO users (display_name, email, password) VALUES (?, ?, ?)",
      [display_name, email, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User registered successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, display_name: user.display_name, email: user.email } });
  });
};
