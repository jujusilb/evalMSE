import { grimoireService } from "../services/grimoireService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";
import Ge from "cors";

 console.log("IN grimoireCONTROLLER !")
 
export const grimoireController = {
    
    async show (req, res, next) {
        try {
            const result = await grimoireService.show(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async index(req, res, next) {
        console.log("IN grimoireControler.INDEX")
        try {
            const result = await grimoireService.index({
                search: req.query || {},
                userId:req.user.id
            });
            console.log("result",result)
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
}