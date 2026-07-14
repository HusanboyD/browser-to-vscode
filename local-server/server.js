const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(require("cors")());

const dataFilePath = path.join(__dirname, "data", "currentData.js");

app.post("/save-text", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Text was not provided.",
    });
  }

  const fileContent = `export default \`${text}\`;\n`;

  fs.writeFileSync(dataFilePath, fileContent);

  res.json({
    success: true,
    message: "Text received successfully.",
    text,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});