import express from "express";

import {
  processReceipts,
  getReceiptById,
} from "../controllers/receiptsControllers.js";
import validateReceipt from "../middleware/dataValidation.js";

const router = express.Router();

router.route("/process").post(validateReceipt, processReceipts);

router.route("/:id/points").get(getReceiptById);

export default router;
