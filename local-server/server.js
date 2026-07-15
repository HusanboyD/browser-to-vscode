const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, "data", "currentData.js");

app.post("/save-text", (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text was not provided.",
      });
    }

    const safeText = text
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    const fileContent = `export default \`\n${safeText}\n\`;\n`;

    fs.writeFileSync(dataFilePath, fileContent, "utf8");

    return res.json({
      success: true,
      message: "Text saved successfully.",
      text,
    });
  } catch (error) {
    console.error("File writing error:", error);

    return res.status(500).json({
      success: false,
      message: "Text could not be saved.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});