import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";



export const grimoireService = {
  
  async show(id) {
    const plat =await prisma.plat.findUnique({
          where: { id: id }
        });
    if (!plat) {
      throw new ApiError(404, "erreur plat non trouvé");
    }

    return plat
  },

  async index( payload ) {
    console.log("payload", payload)
    console.log("IN grimoireService.INDEX")
    const { search, userId } = payload || {};
    const where = {};
    console.log("search", search)
    if (search && typeof search === 'string' && search.trim() !== "") {
        where.plat = {
            label: { contains: search, mode: "insensitive" }
        };
    }

    const grimoires = await prisma.grimoire.findMany({
      where,
      include: {
      plat: true // Très important pour avoir le nom/label de l'ingrédient !
      },
      orderBy: [{ id: "asc" }],
    });

    return { count: grimoires.length, items: grimoires };
  },
};