import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";



export const userService = {
  async acheterIngredient(payload) {
    const { ingredientID, prix, userID } = payload || {};
    const user =await prisma.user.findUnique({
      where: { id: userID }
    });
    if (!user){
      return "cet user n'existe pas";
    }
    const ingredient = await prisma.ingredient.findUnique({
      where: { ingredient: ingredient },
    });
    if (!ingredient){
      return "cet ingredient n'existe pas";
    }
    if (ingredient.prix > user.argent){
      return "pas assez d'argent !";
    }
    const recette = await prisma.recette.create({
      data: {
        ingredientId: ingredient.id,
        userId: user.id
      },
    });
    return { recette: recette };
  },

  async testPlat(payload) {
    const { ingredient, userID } = payload || {};
    const user =await prisma.user.findUnique({
      where: { id: userID }
    });
    const idsRecus = ingredient.map(item => Number(item.id));
    const tousLesPlats = await prisma.plat.findMany({
        include: {
            ingredients: true
        }
    });
    const platsPossibles = tousLesPlats.filter(plat => {
        return plat.ingredients.every(recette => 
            idsRecus.includes(recette.ingredientId)
        );
    });
    if (platsPossibles.length > 0) {
        const platChoisi = platsPossibles[0];
        await prisma.grimoire.create({
            data: {
                platId: platChoisi.id,
                userId: user.id
            },
        });
        return { plat: platChoisi };
    }
  },


  async show(id) {
    const user =await prisma.user.findUnique({
          where: { id: id }
        });
  if (!plat) {
      throw new ApiError(404, "erreur plat non trouvé");
    }
    return user
  },

  async index({ search } = {}) {
    const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { label: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const user = await prisma.user.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });

    return { count: user.length, items: user.map(String) };
  },

  async edit(idRaw, payload) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const { username } = payload || {};
    if (!username) {
      throw new ApiError(400, "Invalid label");
    }
    console.log("username", username)
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "user not found");

    const user = await prisma.user.update({
      where: { id },
      data: { username },
    });

    return { user: user };
  }
};