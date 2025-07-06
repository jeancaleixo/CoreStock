import { Router } from "express";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Testing routes");
});

export default router;
