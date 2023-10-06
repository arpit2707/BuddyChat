const messageM = require("../model/messageM");
const multer = require("multer");
const upload = multer().single("file");
const S3Services = require("../services/s3Services");
require("dotenv").config();

const getMessage = async (req, res, next) => {
  try {
    const response = await messageM.findAll({
      attributes: ["msg", "createdAt", "phone", "fileURL"],
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
    upload(req, res, async (err) => {
      if (err) {
        // Handle any multer errors
        console.error(err);
        return res.status(400).json({ error: "Error uploading file" });
      }
      const file = req.file;
      let fileUrl = "";
      if (file) {
        const fileName = `MediaUser${req.user.id}/${new Date()}-${
          req.file.originalname
        }`;
        fileUrl = await S3Services.uploadToS3(fileName, file);
        console.log(fileUrl);
      } else {
        fileUrl = null;
      }
      const result = await messageM.create({
        msg: req.body.msgng,
        phone: req.user.phone,
        groupId: req.body.groupId,
        fileURL: fileUrl,
      });
      console.log(result.fileURL);
      const msgng = req.body.msgng;
      console.log(msgng);
      res.status(200).json({ message: "Successfully sent message", result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Missing data" });
  }
};

module.exports = { getMessage, sendMessage };
