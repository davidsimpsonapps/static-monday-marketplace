const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// The incident list is kept in the front matter of src/status/incidents.njk.
// This exposes the number still ongoing (no `end`) to the other status pages,
// so every status tab bar can show the same count.
module.exports = function () {
  try {
    const file = path.join(__dirname, "../status/incidents.njk");
    const { data } = matter(fs.readFileSync(file, "utf-8"));
    const incidents = data.incidents || [];
    return { ongoingCount: incidents.filter((incident) => !incident.end).length };
  } catch (error) {
    console.error("Error reading status incidents:", error);
    return { ongoingCount: 0 };
  }
};
