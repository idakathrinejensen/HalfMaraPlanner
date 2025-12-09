
function weightedRandom(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  
  for (const [key, weight] of Object.entries(weights)) {
    if (r < weight) return key;
    r -= weight;
  }
}

function getWorkoutTypeBeginner(dayIndex) {
  // Different weights depending on the day of week
  const weightsByDay = {
    0: { rest: 0.8, easy: 0.2 },              
    1: { easy: 0.7, tempo: 0.1, rest: 0.2 },  
    2: { easy: 0.5, tempo: 0.3, rest: 0.2 },  
    3: { easy: 0.6, tempo: 0.2, rest: 0.2 },  
    4: { easy: 0.7, rest: 0.3 },             
    5: { long: 0.7, easy: 0.3},   
    6: { rest: 0.8, easy: 0.2 }               
  };

  const weights = weightsByDay[dayIndex] || { rest: 1 };

  return weightedRandom(weights);
};

function getWorkoutTypeIntermediate(dayIndex) {
  // Different weights depending on the day of week
  const weightsByDay = {
    0: { rest: 0.8, easy: 0.2 },              // Monday = Mostly rest
    1: { easy: 0.7, tempo: 0.1, rest: 0.2 },  // Tuesday
    2: { easy: 0.5, tempo: 0.3, rest: 0.2 },  // Wednesday
    3: { easy: 0.6, tempo: 0.2, rest: 0.2 },  // Thursday
    4: { easy: 0.7, rest: 0.3 },              // Friday
    5: { long: 0.6, easy: 0.3, rest: 0.1 },   // Saturday = Long run day
    6: { rest: 0.8, easy: 0.2 }               // Sunday = Mostly rest
  };

  const weights = weightsByDay[dayIndex] || { rest: 1 };

  return weightedRandom(weights);
};

function getWorkoutTypeAdvanced(dayIndex) {
  // Different weights depending on the day of week
  const weightsByDay = {
    0: { rest: 0.8, easy: 0.2 },              // Monday = Mostly rest
    1: { easy: 0.7, tempo: 0.1, rest: 0.2 },  // Tuesday
    2: { easy: 0.5, tempo: 0.3, rest: 0.2 },  // Wednesday
    3: { easy: 0.6, tempo: 0.2, rest: 0.2 },  // Thursday
    4: { easy: 0.7, rest: 0.3 },              // Friday
    5: { long: 0.6, easy: 0.3, rest: 0.1 },   // Saturday = Long run day
    6: { rest: 0.8, easy: 0.2 }               // Sunday = Mostly rest
  };

  const weights = weightsByDay[dayIndex] || { rest: 1 };

  return weightedRandom(weights);
};

function generateTrainingPlan({ startDate, weeks, experience }) {
  const plan = [];

  for (let week = 1; week <= weeks; week++) { //loop through each week
    const weekData = {
      title: `Week ${week}`,
      data: []
    };

    for (let i = 0; i < 7; i++) { //loop through each day in a week
      const date = new Date(startDate);
      //calculate which date it is
      date.setDate(date.getDate() + (week - 1) * 7 + i);

      const formattedDate = date.toDateString();
      };

      const workoutType = getWorkoutType(i);

      weekData.data.push({
        date: formattedDate,
        description: isRestDay ? "Rest" : `Easy run - ${5 + week} km`,
        type: isRestDay ? "rest" : "run",
        time: !isRestDay ? `${25 + week * 2} minutes` : null,
        image: isRestDay ? "rest_icon" : "run_icon"
      });
    }

    plan.push(weekData);
  }

  return plan;
}

module.exports = { generateTrainingPlan };