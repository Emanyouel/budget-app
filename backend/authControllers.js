import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../utils/supabaseClient.js";

export const signup = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, role }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Signup successful" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error || users.length === 0) return res.status(400).json({ error: "User not found" });

  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
