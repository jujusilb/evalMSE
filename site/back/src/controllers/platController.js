import { platService } from "../services/platService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";

 console.log("IN platCONTROLLER !")
 
export const platController = {
    
    async create(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await platService.create({
                label:req.body.label,

            });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    },

    async show (req, res, next) {
        try {
            const result = await platService.show(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async index(req, res, next) {
        try {
            const result = await platService.index(req.query || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },



    async edit (req, res, next) {
    console.log("salut !")
        try {
            const result = await platService.edit(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
  }
}