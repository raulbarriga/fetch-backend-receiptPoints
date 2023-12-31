import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";

// import targetReceipt from "../exampleJSON/targetReceipt.json";
import calculatePoints from "../utils/calculatePoints.js";

const cache = new NodeCache();

/*
Takes in a JSON receipt (see example in the example directory) and returns a JSON object with an ID generated by your code.

The ID returned is the ID that should be passed into /receipts/{id}/points to get the number of points the receipt was awarded.

How many points should be earned are defined by the rules below.

Reminder: Data does not need to survive an application restart. This is to allow you to use in-memory solutions to track any data generated by this endpoint.
*/

export const processReceipts = (req, res) => {
  try {
    const receipt = req.body;
    // Generate a unique ID for each receipt
    const receiptId = uuidv4();

    // Calculate points based on receipt data
    const points = calculatePoints(receipt);

    cache.set(receiptId, { receipt, points });

    res.status(200).json({ id: receiptId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getReceiptById = (req, res) => {
  try {
    const receiptId = req.params.id;
    const cachedReceipt = cache.get(receiptId);

    if (cachedReceipt) {
      const points = cachedReceipt.points;

      res.status(200).json({ points });
    } else {
      res.status(404).json({ error: "No receipt found for that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
