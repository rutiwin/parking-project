import { ValidationError } from "./exceptions";
import Joi from "joi";

class ParkingModel {
    id: number;
    streetId: number;
    streetName?: string;
    isOccupied: boolean;

    constructor(id: number, streetId: number, isOccupied: boolean, streetName?: string){
        this.id = id;
        this.streetId = streetId;
        this.streetName = streetName;
        this.isOccupied = isOccupied;
    }

    private static validateSchema = Joi.object({
        id: Joi.number().optional().positive(),
        streetId: Joi.number().required().positive(),
        streetName: Joi.string().optional().min(3).max(50),
        isOccupied: Joi.boolean().optional()
    })

    validate(): void {               
        const res = ParkingModel.validateSchema.validate(this)
        if (res.error){                                                
            throw new ValidationError(res.error.details[0].message)            
        }
    }
}

export default ParkingModel;