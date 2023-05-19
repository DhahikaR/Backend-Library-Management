import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.id;
  const userId = user.id;
  const name = user.name;
  const email = user.email;
  res.status(200).json(userId, name, email);
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Anda Belum Login" });
  }
  const user = await Users.findOne({
    attributes: ["userId", "name", "email"],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Can't Logout" });
    req.status(200).json({ msg: "Logout Successfull!!" });
  });
};