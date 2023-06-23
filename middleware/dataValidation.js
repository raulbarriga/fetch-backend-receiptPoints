import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Define the JSON schema for the receipt
const receiptSchema = {
  type: "object",
  required: ["retailer", "purchaseDate", "purchaseTime", "total", "items"],
  properties: {
    retailer: { type: "string" },
    purchaseDate: { type: "string", format: "date" },
    purchaseTime: { type: "string" },
    total: { type: "string", pattern: "^\\d+\\.\\d{2}$" },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["shortDescription", "price"],
        properties: {
          shortDescription: { type: "string", pattern: "^[\\w\\s\\-]+$" },
          price: { type: "string", pattern: "^\\d+\\.\\d{2}$" },
        },
      },
    },
  },
};

const validateReceipt = (req, res, next) => {
  const receipt = req.body;
  const validate = ajv.compile(receiptSchema);
  const isValid = validate(receipt);

  if (isValid) {
    next(); // Move to the next middleware/controller
  } else {
    res.status(400).json({ error: "Invalid receipt format" });
  }
};

export default validateReceipt;
