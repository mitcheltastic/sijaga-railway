// repositories/socketRepository.js

const { getIO } = require("../socket");

/**
 * Emit a message via Socket.IO
 * @param {string} event - The event name to emit
 * @param {object} data - The data to send with the event
 */
const emitSocketEvent = (event, data) => {
  const io = getIO();
  io.emit(event, data);
};

module.exports = { emitSocketEvent };
