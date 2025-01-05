// services/socketService.js

const { emitSocketEvent } = require("../repository/socketRepository");

/**
 * Emit a test message for the `usageHistory_update` event
 * @param {string} message - The message to emit
 */
const emitTestMessage = (message) => {
  emitSocketEvent("usageHistory_update", { message });
};

module.exports = { emitTestMessage };
