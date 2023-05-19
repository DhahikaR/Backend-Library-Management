import Users from "../models/userModel.js";

export const userVerify = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(400).json({ msg: "Anda Belum Login" });
  }
  const user = await Users.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  req.userId = user.id;
  req.name = user.name;
  next();
};
