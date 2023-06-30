const userGroupM = require("../model/userGroupM");
const userM = require("../model/userM");

const setGroup = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groupId = req.body.groupId;
    console.log("AAYA TOH USERGROUP ME DEFAULT ADMIN SET KARNE");
    const response = await userGroupM.create({
      isAdmin: true,
      userId: userId,
      groupId: groupId,
    });
    console.log(response);
    res.status(200).json({ message: "Creator Set As Admin", response });
  } catch (error) {
    console.log("Here Is the Error");
    console.log(error);
    return res.status(500).json({ message: "Default setting admin failed" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    console.log("Admin check ka");
    console.log(req.query);
    // console.log(req.user);
    // console.log(req.query);
    const result = await userGroupM.findOne({
      where: { userId: req.query.id, groupId: req.query.groupId },
    });
    console.log(result);
    res.status(200);
  } catch (error) {
    console.log("Here is error");
    console.log(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    //Add user should only get those users who are not part of the group
    console.log("aaya and fail");
    const groupId = req.body.params.groupId;
    const number = req.body.params.numberToAdd;
    console.log(req.body.numberToAdd);
    console.log(req.body.params.numberToAdd);
    console.log("going to find user to add");
    const userId = await userM.findOne({
      attributes: ["id"],
      where: { phone: number },
    });
    console.log(`found ${userId.id}  ${groupId}`);

    const response = await userGroupM.create({
      userId: userId.id,
      groupId: groupId,
    });

    console.log("done with adding members");
    console.log(response);
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log("error in adding group member");
    console.log(error);
  }
};

const getNonAdmins = async (req, res, next) => {
  try {
    console.log("AAALALLLAAL OKAY");
    const id = await userGroupM.findAll({
      attributes: ["userId"],
      where: { groupId: req.query.groupId, isAdmin: null },
    });
    const idArray = id.map((item) => item.dataValues.userId);
    console.log(idArray);

    const user = await userM.findAll({
      attributes: ["id", "name", "phone"],
      where: { id: idArray },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log("not getting admins");
  }
};

const makeAdmin = async (req, res, next) => {
  try {
    console.log("came here");
    const user = await userGroupM.findOne({
      where: {
        userId: req.body.params.idToAdd,
        groupId: req.body.params.groupId,
      },
    });
    console.log("reached here");
    user.isAdmin = "true";
    await user.save();
    console.log("done with that");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("Error in making admin");
    console.log(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const userIDs = await userGroupM.findAll({
      attributes: ["userId"],
      where: { groupId: req.body.params.groupId },
    });
    const idArray = userIDs.map((item) => item.dataValues.userId);
    const user = await userM.findAll({
      attributes: ["id", "name", "phone"],
      where: { id: idArray },
    });
    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.log("error in getting group users");
    console.log(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const response = userGroupM.destroy({
      where: {
        userId: req.body.params.idToRemove,
        groupId: req.body.params.groupId,
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log("removing user");
    console.log(error);
  }
};
// module.exports = { getMessages, message };
module.exports = {
  setGroup,
  checkAdmin,
  addUser,
  getNonAdmins,
  makeAdmin,
  getUsers,
  removeUser,
};
