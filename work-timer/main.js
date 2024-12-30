import { Database } from "./database.js";
import { Timer } from "./timer.js";

const database = new Database("work-timer");

const timer = new Timer();
document.body.append(timer);
