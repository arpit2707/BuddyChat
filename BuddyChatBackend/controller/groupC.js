const groupM = require("../model/groupM");
const userGroupM = require("../model/userGroupM");

const newGroup = async (req, res, next) => {
  const groupName = req.body.name;
  const creator = req.user.name;
  try {
    const response = await groupM.create({
      name: groupName,
      createdBy: creator,
    });
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

const getGroups = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await groupM.findAll({
      include: [
        {
          model: userGroupM,
          where: {
            userId: userId,
          },
          attributes: [],
        },
      ],
    });
    res.status(200).json({ message: "success", result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { newGroup, getGroups };
