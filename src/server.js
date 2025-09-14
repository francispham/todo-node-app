import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5003;

//? Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//? Get the directory name from the file path
const __dirname = dirname(__filename);

/* MIDDLEWARE */
app.use(express.json());

//? Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, "../public")));
//? Serving up the HTML file from the /public directory
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ROUTES */
//? Auth Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
