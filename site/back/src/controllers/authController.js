import { authService } from "../services/authService.js";
import { ApiError } from "../errors/ApiError.js";

export const authController = {
    async register(req, res, next){
        try {
            console.log("Tentative de création :", req.body);
            const newUser = await authService.register({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                role: "USER"
            });
            res.status(201).json(newUser); 
        } catch (err) {
            next(err);
        }
    },
    async me(req, res, next) {
        try {   
            const result = await authService.me(req.user.id)
            res.json({ result });
        } catch (err) {
            next(err);
        }
    },

    async indexUsers(req, res, next) {
        if (req.user.role !== "ADMIN") {
            console.log("Woups ! je suis connecté en tant que :", req.user.role)
            return next(new ApiError(401, "tu t'es pris pour Zeus, mortel ?"));
        }
        try {
            const result = await authService.indexUsers({ search: req.query.search });
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    async login(req, res, next) {
        try {   
            const result = await authService.login(req.body || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    async patchRole(req, res, next) {
        console.log("salut !")
        if (req.user.role !== "ADMIN") {
            console.log("Woups ! je suis connecté en tant que :", req.user.role)
            return next(new ApiError(401, "tu t'es pris pour Zeus, mortel ?"));
        }
        try {
            const result = await authService.patchRole(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
};