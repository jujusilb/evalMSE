export const nowIso = () => new Date().toISOString();

export const asInt = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : NaN;
};

export const isEmail = (s) =>
  typeof s === "string" && s.includes("@") && s.includes(".");

export const isTaskStatus = (s) => ["TODO", "DOING", "DONE"].includes(s);

export const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
