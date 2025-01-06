const {
  createCardIdDumpService,
  getLatestCardIdDumpService,
} = require("../service/sendIdCardService");

// Controller to create a CardIdDump
const createCardIdDumpController = async (req, res) => {
  try {
    const { cardId } = req.body;

    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "Card ID is required.",
      });
    }

    console.log("Request received:", req.body);

    const result = await createCardIdDumpService(cardId);

    console.log("CardIdDump created:", result);

    res.status(201).json({
      success: true,
      message: "CardIdDump created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error in createCardIdDumpController:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to fetch the latest CardIdDump
const getLatestCardIdDumpController = async (req, res) => {
  try {
    console.log("Request to fetch the latest CardIdDump");

    const result = await getLatestCardIdDumpService();

    console.log("Latest CardIdDump fetched:", result);

    res.status(200).json({
      success: true,
      message: "Latest CardIdDump fetched successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error in getLatestCardIdDumpController:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createCardIdDumpController, getLatestCardIdDumpController };
