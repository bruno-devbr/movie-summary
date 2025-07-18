import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

app.use((req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
