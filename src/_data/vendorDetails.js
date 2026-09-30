const { readFile } = require("fs/promises");
const { join } = require("path");

module.exports = async function () {
  try {
    const raw = await readFile(
      join(__dirname, "..", "..", "vendor-details.json"),
      "utf-8",
    );
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading vendor-details.json:", error);
    return [];
  }
};
