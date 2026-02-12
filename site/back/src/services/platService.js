import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";
import { shuffle } from "../utils/outil.js";
const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";



export const platService = {
  async create(payload) {
    const { label } = payload || {};

    if (!label || String(label).trim().length < 3) {
      throw new ApiError(400, "label must be >= 3 chars");
    }

    const existing = await prisma.plat.findUnique({
      where: { label: String(label).toLowerCase() },
    });
    if (existing) throw new ApiError(409, "plat already exists");


    const plat = await prisma.plat.create({
      data: {
        username: String(username).trim(),
      },
    });

    return { plat: plat };
  },


  async genereCommande({ search } = {}){
    const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { label: { contains: String(search), mode: "insensitive" } },
      ];
    }
    

    const plat = await prisma.plat.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });
    const generatedPlat = shuffle(plat)[0]
    console.log("generatedPlat", generatedPlat.label)
    return generatedPlat;
  },

  async show(id) {
    const plat =await prisma.plat.findUnique({
          where: { id: id }
        });
 if (!plat) {
      throw new ApiError(404, "erreur plat non trouvé");
    }

    return plat
  },

  async index({ search } = {}) {
    const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { label: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const plat = await prisma.plat.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });

    return { count: plat.length, items: plat.map(String) };
  },

  async edit(idRaw, payload) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const { label } = payload || {};
    if (!label) {
      throw new ApiError(400, "Invalid label");
    }
    console.log("label", label)
    const existing = await prisma.plat.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "plat not found");

    const plat = await prisma.plat.update({
      where: { id },
      data: { label },
    });

    return { plat: plat };
  }
};