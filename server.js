import express from "express";
import cors from "cors";

import receiptsRoutes from "./routes/receiptsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/receipts", receiptsRoutes);

app.listen(PORT, () => console.log("Server running on port: ", PORT));
