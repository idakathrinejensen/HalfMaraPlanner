const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "users.json");

function readDb() {
  // Auto-initialize the DB file if it doesn't exist
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
    return { users: [] };
  }

  // Read and parse the DB file
  const file = fs.readFileSync(dbPath, "utf8").trim();
  if (!file) return { users: [] };

  // Handle corrupted JSON 
  try {
    const data = JSON.parse(file);
    if (!data.users) data.users = [];
    if (!Array.isArray(data.users)) data.users = [];
    return data;
  } catch (err) {
    // Backup corrupted DB and reset to a clean structure (prototype-friendly)
    const backupPath = `${dbPath}.corrupt.${Date.now()}.bak`;
    try {
      fs.copyFileSync(dbPath, backupPath);
    } catch (_) {
      // ignore backup errors
    }
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
    return { users: [] };
  }
}

// Write data back to DB file
function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// User login handler
function loginUser(req, res) {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  const password = (req.body?.password || "").toString();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  // Load database and find user
  try {
    const data = readDb();
    const user = (data.users || []).find((u) => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const { password: _pw, ...safeUser } = user;
    return res.json({ success: true, user: safeUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

 // User registration handler 
function registerUser(req, res) {
  const fullName = (req.body?.fullName || "").toString().trim();
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  const password = (req.body?.password || "").toString();
  const experienceLevel = req.body?.experienceLevel;
  const duration = req.body?.duration;
  const raceDate = req.body?.raceDate;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "fullName, email and password are required" });
  }

  // 1. Load database
  let data;
  try {
    data = readDb();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

  // 2. Check if user exists
  const existing = (data.users || []).find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  // 3. Create new user object
  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
    experienceLevel,
    duration,
    raceDate
  };

  // 4. Add to array
  data.users.push(newUser);

  // 5. Save updated file
  try {
    writeDb(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

  const { password: _pw, ...safeUser } = newUser;
  return res.json({ success: true, user: safeUser });
}

module.exports = { loginUser, registerUser };