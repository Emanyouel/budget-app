import supabase from "../utils/supabaseClient.js";

export const getBudgets = async (req, res) => {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addBudget = async (req, res) => {
  const { category, amount, type, date } = req.body;
  const { error } = await supabase
    .from("transactions")
    .insert([{ category, amount, type, date }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Transaction added" });
};
