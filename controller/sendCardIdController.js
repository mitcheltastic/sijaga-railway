const {
  createCardIdDumpService,
  getLatestCardIdDumpService,
} = require("../service/sendIdCardService");

// Controller to create a CardIdDump
const createCardIdDumpController = async (req, res) => {
  try {
    const { cardId } = req.body; // Use `cardId` from the payload

    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "Card ID is required.",
      });
    }

    // Pass `cardId` as `card_id` to the service
    const createdCardIdDump = await createCardIdDumpService(cardId);

    res.status(201).json({
      success: true,
      message: "CardIdDump created successfully.",
      data: createdCardIdDump,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to fetch the latest CardIdDump
const getLatestCardIdDumpController = async (req, res) => {
  try {
    const latestCardIdDump = await getLatestCardIdDumpService();

    res.status(200).json({
      success: true,
      message: "Latest CardIdDump fetched successfully.",
      data: latestCardIdDump,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCardIdDumpController,
  getLatestCardIdDumpController,
};
