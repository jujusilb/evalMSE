import { nowIso } from "../utils/validators.js";

export const logger = (req, _res, next) => {
  console.log(`[${nowIso()}] ${req.method} ${req.url}`);
  next();
};
