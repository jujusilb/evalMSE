import { nowIso } from "../utils/validators.js";

export const healthController = {
  get(_req, res) {
    res.json({ ok: true, time: nowIso(), db: "prisma" });
  },
};
