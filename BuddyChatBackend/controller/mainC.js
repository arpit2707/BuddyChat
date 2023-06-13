const path = require("path");
let mainPage = path.join(__dirname, "../../BuddyChatFrontEnd/view/index.html");

const getMain = async (req, res, next) => {
  try {
    if (mainPage) {
      res.status(200).sendFile(mainPage);
    } else {
      throw new Error("Page Not Found");
    }
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: "Location Not Found" });
  }
};

module.exports = { getMain };
