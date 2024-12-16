import express, { Request, Response, NextFunction, query } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { changeParkingStatus, getParking } from "../services/parkingService";
import { AppException, ValidationError } from "../models/exceptions";

export const parkingRouter = express.Router();

parkingRouter.get(appConfig.routePrefix + "/parking", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract query parameters
        const { street, isOccupied } = req.query;

        // Convert isOccupied to boolean
        const isOccupiedBoolean = isOccupied === 'true' ? true : isOccupied === 'false' ? false : undefined;

        // Call getParking with parameters
        const parking = await getParking(street as string | undefined, isOccupiedBoolean);
        res.status(StatusCode.Ok).json(parking);
    } catch (error) {
        console.log(error);
        if (error instanceof AppException) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
})

parkingRouter.post(appConfig.routePrefix + "/occupied", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract query parameters
        const { id, isOccupied } = req.body;

        // Simple validation
        if (typeof id !== 'number' || typeof isOccupied !== 'boolean') {
            throw new ValidationError("Invalid input: 'id' must be a number and 'isOccupied' must be a boolean.");
        }

        // Call getParking with parameters
        await changeParkingStatus(id, isOccupied);
        res.status(StatusCode.Ok).json({ message: "Parking status updated successfully." });
    } catch (error) {
        console.log(error);
        if (error instanceof AppException) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
})