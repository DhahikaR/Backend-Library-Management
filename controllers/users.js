import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "nip", "name"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["nip", "name"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ mag: error.msg });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  const { nip, name, email } = req.body;
  try {
    await Users.update(
      {
        nip: nip,
        name: name,
        email: email,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Updated!!" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

export const Register = async (req, res) => {
  const { nip, name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      nip: nip,
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(200).json({ msg: "Register Successful!!!" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};
