const messageM = require("../model/messageM");

const getMessage = async (req, res, next) => {
  try {
    const response = await messageM.findAll({
      attributes: ["msg", "createdAt", "phone"],
      //Yahan Cross check karna hai
      where: { groupId: req.query.groupId },
      order: [["createdAt", "ASC"]],
    });
    res
      .status(200)
      .json({ message: "successfully fetched the messages", response });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Failed in fetching messages" });
  }
};

//User Group messsage send and save came here fron UserGroup
const sendMessage = async (req, res, next) => {
  try {
    console.log("User Body ka");
    console.log(req.user);
    console.log(req.body.msgng);
    const result = await messageM.create({
      msg: req.body.msgng,
      phone: req.user.phone,
      groupId: req.body.groupId,
    });
    console.log(result);
    res.status(200).json({ message: "Successfully sent message", result });
  } catch (error) {
    console.log(error);
  }
};

//Broadcast message user group ka yahan aa gya
// const sendMessage = async (req, res, next) => {
//   try {
//     const msg = req.body.msgng;
//     const phone = req.user.phone;
//     const response = await messageM.create({ msg, phone: phone });
//     res.status(200).json({ msg });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error });
//   }
// };

module.exports = { getMessage, sendMessage };
