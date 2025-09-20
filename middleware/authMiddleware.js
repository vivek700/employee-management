import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  const userId = req.cookies["better-auth-user"];
  if (!userId) {
    return res.sendSatus(401);
  }
  try {
    const found = await User.findOne({ id: userId }).exec();
    if (!found) return res.sendStatus(403);
    next();
  } catch (err) {
    console.error(err);
  }
};
