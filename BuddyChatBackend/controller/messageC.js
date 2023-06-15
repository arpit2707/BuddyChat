const express = require("express");
const messageM = require("../model/messageM");

const getMessage = async (req, res, next) => {
  try {
    const response = await messageM.findAll({
      attributes: ["msg", "createdAt", "phone"],
      order: [["createdAt", "ASC"]],
    });
    // console.log(response);
    res
      .status(200)
      .json({ message: "successfully fetched the messages", response });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Failed in fetching messages" });
  }
};

module.exports = { getMessage };
