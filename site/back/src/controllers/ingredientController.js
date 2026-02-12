import { ingredientService } from "../services/ingredientService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";

 console.log("IN INGREDIENTCONTROLLER !")
 
export const ingredientController = {
    
    async create(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await ingredientService.create({
                label:req.body.label,

            });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    },

    async show (req, res, next) {
        try {
            const result = await ingredientService.show(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async index(req, res, next) {
        try {
            const result = await ingredientService.index(req.query || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },



    async edit (req, res, next) {
    console.log("salut !")
        try {
            const result = await ingredientService.edit(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
  }
}