import { generateHalfMarathonPlan } from "./trainingplan.js";

const plan = generateHalfMarathonPlan("2025-10-12", "beginner", 12);

console.log(JSON.stringify(plan, null, 2));
