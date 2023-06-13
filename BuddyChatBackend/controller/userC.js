const user = require("../model/userM");
const bcrypt = require("bcrypt");
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
        const result = await user.create({
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

module.exports = { register };
