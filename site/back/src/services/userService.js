import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE LE JULIEN";
const JWT_EXPIRES_IN = "7d";



export const userService = {
  async acheterIngredient(payload) {
    const { ingredientId, prix, userId } = payload || {};
    const user =await prisma.user.findUnique({
      where: { id: userId }
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
    const { ingredients, userId } = payload || {};
    const user =await prisma.user.findUnique({
      where: { id: userId }
    });
    const idsRecus = ingredients.map(item => Number(item.id));
    console.log("LOG 1 - IDs recus :", idsRecus);
    const tousLesPlats = await prisma.plat.findMany({
        include: {
            ingredients: true
        }
    });
    console.log("LOG 2 - Ingredients plat 9 :", tousLesPlats.find(p => p.id === 9)?.ingredients.map(i => i.ingredientId));
    const platsPossibles = tousLesPlats.filter(plat => {
        if (!plat.ingredients || plat.ingredients.length === 0) return false;
        return plat.ingredients.every(recette => 
            idsRecus.includes(recette.ingredientId)
        );
    });
    console.log("LOG 3 - Plats trouves :", platsPossibles.length);
    if (platsPossibles.length > 0) {
      const platChoisi = platsPossibles[0];
      const existing = await prisma.grimoire.findFirst({
        where: { 
          platId: platChoisi.id,
          userId: user.id
        }
      });
      if (existing){
        throw new ApiError(409, "plat deja connu !");
      } else {
        await prisma.grimoire.create({
          data: {
              platId: platChoisi.id,
              userId: user.id
          },
        });
        return { plat: platChoisi };
      }
    } else {
      for (const ingId of idsRecus) {
        const stockItem = await prisma.stock.findUnique({
          where: {
            userId_ingredientId: { 
              userId: user.id,
              ingredientId: ingId
            }
          }
        });

        if (stockItem && stockItem.quantite > 0) {
          await prisma.stock.update({
            where: { id: stockItem.id },
            data: { quantite: stockItem.quantite - 1 }
          });
          console.log(`Inventaire mis à jour : -1 pour l'ingrédient ${ingId}`);
        }
      }
      return { message: "Aucun plat découvert, ingrédients consommés." };
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