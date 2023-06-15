const userM = require("../model/userM");
const messageM = require("../model/messageM");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
let chatFile = path.join(
  __dirname,
  "../../BuddyChatFrontEnd/view/chatWindow.html"
);

function generateAccessToken(id, name, ispremiumuser) {
  return jwt.sign(
    { userId: id, userName: name, premium: ispremiumuser },
    "secretKey"
  );
}

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log("Came for registration");
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Failed to hash password" });
      }

      try {
        const result = await userM.create({
          name,
          email,
          phone,
          password: hash,
        });
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          return res.status(400).json({ error: "User already exists" });
        }
      }

      res.status(201).json({ message: "Successfully created new user" });
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ err: "Bad Paramters . Something is missing" });
    }
    console.log("aa gya sign in hone ko");
    const user = await userM.findAll({ where: { email } });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          console.log("entred password is same no error");
          //console.log(generateAccessToken(user[0].id,user[0].name));
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateAccessToken(
              user[0].id,
              user[0].name,
              user[0].ispremiumuser
            ),
          });
        } else {
          console.log("password is worng");
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};

const chatPage = (req, res, next) => {
  try {
    res.status(200).sendFile(chatFile);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to load page", err: `${error}` });
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const msg = req.body.msgng;
    const sender = req.user.name;
    const response = await messageM.create({ msg, userId: req.user.id });
    res.status(200).json({ msg, sender });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { register, login, chatPage, sendMessage };
