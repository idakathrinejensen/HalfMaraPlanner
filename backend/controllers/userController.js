const fs = require("fs");
const path = require("path");
const {generateHalfMarathonPlan} = require("../services/trainingplan")
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

  // Load database
  let data;
  try {
    data = readDb();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

  // Check if user exists
  const existing = (data.users || []).find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  // Create new user object
  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
    experienceLevel,
    duration,
    raceDate
  };

  if (experienceLevel && duration && raceDate) {
    const plan = generateHalfMarathonPlan(raceDate, experienceLevel, duration);

    newUser.trainingPlan = {
      level: experienceLevel,
      weeks: duration,
      raceDate,
      sections: plan,
    };
  }

  // Add to array
  data.users.push(newUser);

  // Save updated file
  try {
    writeDb(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

  const { password: _pw, ...safeUser } = newUser;
  return res.json({ success: true, user: safeUser });
}

function getTrainingPlan(req, res) {
  const userId = Number(req.params.id);

  try {
    const data = readDb();
    const user = data.users.find((u) => u.id === userId);

    if (!user || !user.trainingPlan) {
      return res.status(404).json({
        success: false,
        message: "Training plan not found",
      });
    }

    return res.json({
      success: true,
      trainingPlan: user.trainingPlan,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
function markWorkoutComplete(req, res) {
  const userId = Number(req.params.id); // user id from URL
  const { weekIndex, dayIndex } = req.body; // indices of the workout

  if (isNaN(userId) || weekIndex === undefined || dayIndex === undefined) {
    return res.status(400).json({ success: false, message: "Invalid parameters" });
  }

  try {
    const data = readDb();
    const user = data.users.find(u => u.id === userId);
    if (!user || !user.trainingPlan) {
      return res.status(404).json({ success: false, message: "User or plan not found" });
    }

    const week = user.trainingPlan.sections[weekIndex];
    if (!week || !week.data[dayIndex]) {
      return res.status(404).json({ success: false, message: "Workout not found" });
    }

    // Mark as complete
    week.data[dayIndex].complete = true;

    // Save DB
    writeDb(data);

    return res.json({ success: true, workout: week.data[dayIndex] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { loginUser, registerUser, getTrainingPlan, markWorkoutComplete};