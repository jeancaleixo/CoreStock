import "dotenv/config";
import express from "express";
import router from "./Routes/index.js";

const app = express();

router(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
