// controllers/socketController.js

const { emitTestMessage } = require("../service/socketService");

/**
 * Handle POST /history/test-socket requests
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const postTestSocket = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      status: false,
      message: "Message is required",
    });
  }

  emitTestMessage(message);

  return res.status(200).json({
    status: true,
    message: "Message emitted successfully",
  });
};

module.exports = { postTestSocket };
