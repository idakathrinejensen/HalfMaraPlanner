
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "users.json");

function readDb() {
  // initialize the DB file if it doesn't exist
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
    return { users: [] };
  }

  const file = fs.readFileSync(dbPath, "utf8").trim();
  if (!file) return { users: [] };

  try {
    const data = JSON.parse(file);
    if (!data.users) data.users = [];
    if (!Array.isArray(data.users)) data.users = [];
    return data;
  } catch (err) {
    // Backup corrupted DB and reset to a clean structure
    const backupPath = `${dbPath}.corrupt.${Date.now()}.bak`;
    try {
      fs.copyFileSync(dbPath, backupPath);
    } catch (_) {
    }
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
    return { users: [] };
  }
}

function getAllUsers() {
  const data = readDb();
  return data.users;
}

function findUserByEmail(email) {
  const needle = (email || "").toString().trim().toLowerCase();
  const users = getAllUsers();
  return users.find((u) => (u.email || "").toString().trim().toLowerCase() === needle);
}

module.exports = { getAllUsers, findUserByEmail };