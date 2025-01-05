const express = require("express");
const router = express.Router();
const availabilityController = require("../controller/availabilityController");

// POST: Add a new availability record
router.post("/post", availabilityController.postAvailability);

// GET: Get the latest availability record
router.get("/get-latest", availabilityController.getAvailLatest);

module.exports = router;
