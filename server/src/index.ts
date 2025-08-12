import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/countries", countryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Country info api is running successfully");
});

app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
