const { readFile } = require("fs/promises");
const { join } = require("path");

module.exports = async function () {
  try {
    const raw = await readFile(
      join(__dirname, "..", "..", "partner-websites.json"),
      "utf-8",
    );
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading partner-websites.json:", error);
    return [];
  }
};
