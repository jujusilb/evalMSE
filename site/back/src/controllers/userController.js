import { userService }  from "../services/userService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";

 console.log("IN platCONTROLLER !")
 
export const userController = {
    
    async acheterIngredient(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await userService.acheterIngredient({
                ingredient:req.body.ingredient,
                user:req.user.id
            });
            console.log(result);
        } catch (err) {
            next(err);
        }
    },




    async testPlat(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await userService.testPlat({
                ingredient:req.body.ingredient,
                user:req.user.id
            });
            console.log(result);
        } catch (err) {
            next(err);
        }
    },

    async show (req, res, next) {
        try {
            const result = await userService.show(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async index(req, res, next) {
        try {
            const result = await userService.index(req.query || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },



    async edit (req, res, next) {
    console.log("salut !")
        try {
            const result = await userService.edit(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
  }
}