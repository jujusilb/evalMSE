import { stockService } from "../services/stockService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";
import e from "cors";

 console.log("IN STOCKCONTROLLER !")
 
export const stockController = {
    
    async create(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await stockService.create({
                label:req.body.label,

            });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    },

    async show (req, res, next) {
        try {
            const result = await stockService.show(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async index(req, res, next) {
        console.log("IN StockControler.INDEX")
        try {
            const result = await stockService.index({
                search: req.query || {},
                userId:req.user.id
            });
            console.log("result",result)
            res.json(result);
        } catch (err) {
            next(err);
        }
    },



    async edit (req, res, next) {
    console.log("salut !")
        try {
            const result = await stockService.edit(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
  }
}