import { creature } from "../mongo.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt } from "../utils/validators.js";
import mongoose from "mongoose";
import { authService} from "./authService.js"
import { testimony } from "../mongo.js";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";

export const loreService = {
  async createCreature(payload) {
    const { name, origine, creatorId } = payload || {};

    if (!name || String(name).trim().length < 2) {
      throw new ApiError(400, "Le nom doit avoir au moins 2 caractères");
    }

 
    const mongoData = {
      name: String(name).trim(),
      origin: origine ? String(origine).trim() : "Inconnue",
      creatorId: asInt(creatorId),
      createdAt: new Date()
    };

    const result = await creature.create(mongoData);
    return result;
  },

  async showCreature(id){
    const idToFind =id;
    const result =await creature.findById(idToFind)
    if (!result){throw new ApiError(404, "Cette créature n'existe pas encore... creez la !");}
    
    console.log("id, idToFind, result", id, idToFind, result)
    return result;
  },

  async indexCreatures({ search } = {}) {
  const where = {};
    if (search && String(search).trim() !== "") {
      where.OR = [
        { name: { contains: String(search), mode: "insensitive" } },
        { origine: { contains: String(search), mode: "insensitive" } },
      ];
    }
    const creatures = await creature.find({});
    return {
      count: creatures.length,
      items: creatures.map(item => {
        return {
          id: item._id,
          name: item.name,
          origine: item.origin,
          creatorId: item.creatorId
        }
      })
    }
  },
  
  async createTestimony(payload) {
    const { description, authorId, creatureId } = payload || {};

    if (!description || String(description).trim().length < 2) {
      throw new ApiError(400, "ben dis donc ! n'est pas homere qui veut...");
    }
    const mongoData = {
      creatureId: String(creatureId),
      description: String(description).trim(),
      authorId: asInt(authorId),
      createdAt: new Date()
    };
    console.log("mongoData", mongoData)
    const result = await testimony.create(mongoData);
    return result;
  },
  
  async showTestimony(creatureId){
    console.log("IN creature/:id/testimony")
    const result =await testimony.find({creatureId:creatureId})
    console.log("ID cherché :", creatureId);
    console.log("Résultat trouvé :", result);
    console.log("Nombre trouvé :", result.length);
    if (result.length===0){throw new ApiError(404, "Aucun temoignage sur cette creature... si vous la connaissez, racontez nous !");}
    
    console.log("creatureId, result", creatureId, result)
    return result;
  },
  
       
async validateTestimony(testimonyId, payload, validatedBy) {
    const { status } = payload || {};

    if (!Number.isFinite(validatedBy)) throw new ApiError(400, "Invalid id");

    if (!status || !["VALIDATED"].includes(status)) {
      throw new ApiError(400, "Pose ton vin Dyonisos !");
    }

    console.log("testimonyId", testimonyId,"status :", status, "validatedBy", validatedBy)
    const existing = await testimony.find({Id:testimonyId});
    if (!existing) throw new ApiError(404, "User not found");

    const testi = await testimony.findById(testimonyId);
    const result =testi.authorId
    await prisma.user.update({
        where: { id: testi.authorId },
        data: { 
            reputation: { increment: 1 }
        }
    });
    const updateTestimony = await testimony.findByIdAndUpdate(
      
      testimonyId,
      {
        status: String(status),
        validatedBy: validatedBy,
        validatedAt: new Date()
      },  
      { new: true }
    );

    return { updateTestimony };
  },

  async rejectTestimony(testimonyId, payload, validatedBy) {
    const { status } = payload || {};

    if (!Number.isFinite(validatedBy)) throw new ApiError(400, "Invalid id");

    if (!status || !["REJECTED"].includes(status)) {
      throw new ApiError(400, "Pose ton vin Dyonisos !");
    }

    console.log("testimonyId", testimonyId,"status :", status, "validatedBy", validatedBy)
    const existing = await testimony.find({Id:testimonyId});
    if (!existing) throw new ApiError(404, "User not found");

    
    const testi = await testimony.findById(testimonyId);
    const result =testi.authorId
    await prisma.user.update({
        where: { id: testi.authorId },
        data: { 
            reputation: { decrement: 1 }
        }
    });
    const updateTestimony = await testimony.findByIdAndUpdate(
      testimonyId,
      {
        status: String(status),
        validatedBy: validatedBy,
        validatedAt: new Date()
      },  
      { new: true }
    );

    return { updateTestimony };
  }

};

