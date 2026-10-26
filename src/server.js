
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const DB_PROVIDER = (process.env.DB_PROVIDER || "mongodb")
  .trim()
  .toLowerCase();

const startServer = async () => {
  try {
    if (DB_PROVIDER === "mongodb") {
      await connectDB();
    } else if (DB_PROVIDER === "dynamodb") {
      console.log("Using DynamoDB; skipping MongoDB connection");
    } else {
      throw new Error(`Unsupported DB_PROVIDER: ${DB_PROVIDER}`);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
