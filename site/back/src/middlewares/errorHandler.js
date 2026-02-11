import { ApiError } from "../errors/ApiError.js";

/**
 * Middleware Express de gestion centralisée des erreurs.
 */
/* eslint-disable no-unused-vars */
export const errorHandler = (err, _req, res, _next) => {
  // Erreurs Prisma "connues"
  // - P2002: contrainte unique
  // - P2025: record not found
  if (err?.code === "P2002") {
    return res.status(409).json({ error: "Unique constraint failed" });
  }
  if (err?.code === "P2025") {
    return res.status(404).json({ error: "Record not found" });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
};
/* eslint-enable no-unused-vars */
