import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";



export const ingredientService = {
  async create(payload) {
    const { label } = payload || {};

    if (!label || String(label).trim().length < 3) {
      throw new ApiError(400, "label must be >= 3 chars");
    }

    const existing = await prisma.ingredient.findUnique({
      where: { label: String(label).toLowerCase() },
    });
    if (existing) throw new ApiError(409, "ingredient already exists");


    const ingredient = await prisma.ingredient.create({
      data: {
        username: String(username).trim(),
      },
    });

    return { ingredient: ingredient };
  },

  async show(id) {
    const ingredient =await prisma.ingredient.findUnique({
          where: { id: id }
        });
 if (!ingredient) {
      throw new ApiError(404, "erreur ingredient non trouvé");
    }

    return ingredient
  },

  async index({ search } = {}) {
    const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { label: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const ingredient = await prisma.ingredient.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });

    return { count: ingredient.length, items: ingredient.map(String) };
  },

  async edit(idRaw, payload) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const { label } = payload || {};
    if (!label) {
      throw new ApiError(400, "Invalid label");
    }
    console.log("label", label)
    const existing = await prisma.ingredient.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "ingredient not found");

    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: { label },
    });

    return { ingredient: ingredient };
  }
};