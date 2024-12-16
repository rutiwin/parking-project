import express, { Request, Response, NextFunction, query } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { AppException } from "../models/exceptions";
import { getUniqueStreets } from "../services/streetService";

export const streetRouter = express.Router();

streetRouter.get(appConfig.routePrefix + "/streets", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const streets = await getUniqueStreets();
        res.status(StatusCode.Ok).json(streets);
    } catch (error) {
        console.log(error);
        if (error instanceof AppException) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
})