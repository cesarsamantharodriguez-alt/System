import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import connectDB from "./src/utils/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Starting POINT");
});

app.use("/api/auth", authRoutes);
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT);
  });
};

startServer();
