import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "user not found" });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ msg: "wrong password" });
  req.session.userId = user.id;
  const id = user.id;
  const name = user.nama;
  const email = user.email;
  res.status(200).json({ id, name, email });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "You are haven't Login" });
  }
  const user = await Users.findOne({
    attributes: ["id", "name", "email"],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(401).json({ msg: "Can't Logout" });
    req.status(200).json({ msg: "Logout Successful!!" });
  });
};
