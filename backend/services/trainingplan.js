// Helper: date formatting like "Wed, Nov 26"
function formatDateShort(d) {
  const opts = { weekday: "short", month: "short", day: "numeric" }; //short = mon instead of monday
  return new Date(d).toLocaleDateString("en-US", opts); //the language
}

function getStartDateFromRace(raceDateStr, weeks) {
  const raceDate = new Date(raceDateStr); // convert raceDate to date object
  if (isNaN(raceDate)) throw new Error("Invalid race date"); // check if it is valid

  const startDate = new Date(raceDate); //create a date object for startdate
  startDate.setDate(raceDate.getDate() - weeks * 7); //modify startdate based on raceDate

  return startDate;
}

// Icons
const ICONS = {
  rest: "green.png",
  easy: "grey.png",
  tempo: "orange.png",
  long: "purple.png",
};

//Estimated starting pace for the different groups
//Used to estimate time for a run
const PACE = {
  beginner: 6.5, // 6:50 / km (minutes)
  intermediate: 5.5, // 5:50 / km
  advanced: 4.75, // 4:75 / km
};

//used to calculate hours from minutes for nice formatting
function fmtTimeFromMinutes(mins) {
  if (mins >= 60) {
    const h = Math.floor(mins / 60); //finds the hours (uses floor to only get whole hours)
    const m = Math.round(mins - h * 60); //finds the minutes (uses round to round up or down to nearst integer)
    if (m === 0) return `${h} hr${h > 1 ? "s" : ""}`; //if not minutes only return hr. If multiple hr add s
    return `${h} hr ${m} min${h > 1 ? "s" : ""}`;
  } else {
    return `${Math.round(mins)} minutes`; //runs if mins is not greater than 60
  }
}

// Create single week
function buildWeek(startOfWeekDate, level, weekIndex, totalWeeks) {
  // Determine lower volume weeks for longer plans
  const isStepBack = (weekIndex + 1) % 4 === 0 && totalWeeks >= 8; //stepback every fourth week for plans longer than 8

  // Base long-run progression by level
  const longBase = { beginner: 6, intermediate: 10, advanced: 12 }; // starting long-run km
  const longWeeklyIncrease = { beginner: 1, intermediate: 1.5, advanced: 2 };
  const maxLong = { beginner: 16, intermediate: 18, advanced: 19 };

  // Compute long distance
  let longDistance = Math.round(
    longBase[level] + weekIndex * longWeeklyIncrease[level]
  );
  longDistance = Math.min(longDistance, maxLong[level]); //math.min takes the smallest of the two

  // Tempo distance progression
  const tempoBase = { beginner: 2, intermediate: 4, advanced: 5 };
  const tempoIncrease = { beginner: 0.2, intermediate: 0.4, advanced: 0.6 };
  const maxTempo = { beginner: 6, intermediate: 8, advanced: 10 };

  //compute tempo distance
  let tempoDistance = Math.round(
    tempoBase[level] + weekIndex * tempoIncrease[level]
  );
  tempoDistance = Math.min(tempoDistance, maxTempo[level]); //math.min takes the smallest of the two

  // Easy runs distances
  const easyBase = { beginner: 3, intermediate: 4, advanced: 5 };
  const maxEasy = { beginner: 6, intermediate: 7, advanced: 10 };
  const easyIncreaseEvery = 2; // every 2 weeks increase distance.
  //add one km every second week, but do not exceed max distance.
  let easyDistance = Math.min(
    easyBase[level] + Math.floor(weekIndex / easyIncreaseEvery) * 1,
    maxEasy[level]
  );

  // Make step-back week distances smaller
  if (isStepBack) {
    longDistance = Math.max(longBase[level], Math.round(longDistance * 0.8));
    tempoDistance = Math.max(tempoBase[level], Math.round(tempoDistance * 0.8));
    easyDistance = Math.max(easyBase[level], Math.round(easyDistance * 0.7));
  }

  // Build 7-day week starting from startOfWeekDate
  const days = [];
  for (let d = 0; d < 7; d++) {
    const date = new Date(startOfWeekDate);
    date.setDate(startOfWeekDate.getDate() + d); //get the current date
    const fd = formatDateShort(date);

    // Map workouts to day index:
    if (d === 0 || d === 3 || d === 5) { 
      days.push({
        date: fd,
        isoDate: date.toISOString().split("T")[0], //used to compare in homescreen to find todays workout
        description: "Recovery day",
        image: ICONS.rest,
        complete: false, 
      });
    } else if (d === 1 || d === 4) {
      const mins = easyDistance * PACE[level];
      days.push({
        date: fd,
        isoDate: date.toISOString().split("T")[0],
        description: `Easy - ${easyDistance} km`,
        image: ICONS.easy,
        time: fmtTimeFromMinutes(mins),
        complete: false,
      });
    } else if (d === 2) {
      const mins = tempoDistance * PACE[level] * 0.95; // tempo slightly faster
      days.push({
        date: fd,
        isoDate: date.toISOString().split("T")[0],
        description: `Tempo - ${tempoDistance} km`,
        image: ICONS.tempo,
        time: fmtTimeFromMinutes(mins),
        complete: false,
      });
    }  else if (d === 6) {
      const mins = longDistance * PACE[level];
      days.push({
        date: fd,
        isoDate: date.toISOString().split("T")[0], 
        description: `Long - ${longDistance} km`,
        image: ICONS.long,
        time: fmtTimeFromMinutes(mins),
        complete: false,
      });
    }
  }

  return days;
}

// Build a plan for a given level and weeks
function buildPlan(startDateStr, level, weeks) {
  const startDate = new Date(startDateStr);
  if (isNaN(startDate)) throw new Error("Invalid start date: " + startDateStr);

  const sections = [];
  for (let w = 0; w < weeks; w++) {
    // start of this week = startDate + w*7 days
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() + w * 7); //handles changes in weeks

    const weekDays = buildWeek(startOfWeek, level, w, weeks);
    sections.push({
      title: `Week ${w + 1}`,
      data: weekDays,
    });
  }
  return sections;
}

// Main exported function: returns the plan
function generateHalfMarathonPlan(raceDateStr, level, weeks) {
  const startDate = getStartDateFromRace(raceDateStr, weeks);
  const startDateStr = startDate.toISOString().split("T")[0];
  return buildPlan(startDateStr, level, weeks);
}
module.exports = { generateHalfMarathonPlan };
