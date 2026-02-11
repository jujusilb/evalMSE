import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";

function safeUser(u) {
  if (!u) return null;
  const { password, ...rest } = u;
  return rest;
}

export const authService = {
  async register(payload) {
    const { email, username, password, role = "USER" } = payload || {};

    if (!email || !String(email).includes("@")) {
      throw new ApiError(400, "Invalid email");
    }

    if (!username || String(username).trim().length < 3) {
      throw new ApiError(400, "Username must be >= 3 chars");
    }

    if (!password || String(password).length < 6) {
      throw new ApiError(400, "Password must be >= 6 chars");
    }

    if (!["USER", "EXPERT", "ADMIN"].includes(role)) {
      throw new ApiError(400, "Invalid role (USER|EXPERT|ADMIN)");
    }

    const existing = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
    });
    if (existing) throw new ApiError(409, "Email already used");

    const hashed = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        username: String(username).trim(),
        password: hashed,
        role,
      },
    });

    return { user: safeUser(user) };
  },

  async login(payload) {
    const { email, password } = payload || {};
    if (!email || !password) throw new ApiError(400, "Email and password required");

    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
    });

    if (!user) throw new ApiError(401, "Invalid credentials");

    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { token, user: safeUser(user) };
  },

  async me(id) {
    const user =await prisma.user.findUnique({
          where: { id: id }
        });
 if (!user) {
      throw new ApiError(404, "tu es dans l'Hades ou quoi?");
    }

    return safeUser(user)
  },

  async indexUsers({ search } = {}) {
    const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { email: { contains: String(search), mode: "insensitive" } },
        { username: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });

    return { count: users.length, items: users.map(safeUser) };
  },

  async patchRole(idRaw, payload) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const { role } = payload || {};
    if (!role || !["USER", "EXPERT", "ADMIN"].includes(role)) {
      throw new ApiError(400, "Invalid role (USER|EXPERT|ADMIN)");
    }
    console.log("role", role)
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "User not found");

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return { user: safeUser(user) };
  }
};