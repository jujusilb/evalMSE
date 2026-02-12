import { userService }  from "../services/userService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";
import { authenticateToken } from "../middlewares/auth.js";

 console.log("IN USERCONTROLLER !")
 
export const userController = {
    
    async acheterIngredient(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await userService.acheterIngredient({
                ingredient:req.body.ingredients,
                user:req.user.id
            });
            console.log(result);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },




    async testPlat(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await userService.testPlat({
                ingredients:req.body.ingredients,
                userId:req.user.id
            });
            console.log(result)
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async checkAvantCommande(req, res, next){
        try {
            console.log("req user", req.user)
            console.log("req body", req.body)
            const result = await userService.checkAvantCommande(req.body, req.user.id)
            res.json(result)
        } catch (err) {
            next(err);
        }
    },

    async servirPlat(req, res, next){
        try {
            console.log("req user", req.user)
            console.log("req body", req.body)
            const result = await userService.servirPlat(req.body, req.user.id)
            res.json(result)
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