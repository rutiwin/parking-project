import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { NotFoundError } from "../models/exceptions";
import ParkingModel from "../models/parkingModel";

export async function getParking(street?: string, isOccupied?: boolean): Promise<ParkingModel[]> {
    let q = `SELECT p.*, s.streetName FROM parking p JOIN street s ON p.streetId = s.id`; // Joining the street table to get streetName

    if (street || isOccupied !== undefined) {
        q += ` WHERE`;

        if (street) {
            q += ` s.streetName = '${street}'`; // Directly inserting the streetName
        }

        if (isOccupied !== undefined) {
            if (street) q += ` AND`;
            q += ` p.isOccupied = ${isOccupied ? 1 : 0}`; // Using 1 for true and 0 for false
        }
    }

    const res = await runQuery(q);

    if (res.length === 0) {
        if (street) {
            throw new NotFoundError(`No parking spaces found on the street: ${street}`);
        } else if (isOccupied !== undefined) {
            throw new NotFoundError(`No parking spaces found with the specified occupancy status.`);
        } else {
            throw new NotFoundError("No parking spaces found.");
        }
    }

    const parkingLots = res.map((p) => new ParkingModel(p.id, p.streetId, p.isOccupied, p.streetName));
    return parkingLots;
}

export async function changeParkingStatus(id: number, isOccupied: boolean): Promise<void> {
    let q = `UPDATE parking SET isOccupied=${isOccupied} WHERE id=${id}`;

    const res = await runQuery(q) as ResultSetHeader | any;

    if (res.affectedRows === 0) {
        throw new NotFoundError(`No parking spaces found for ID: ${id}`);
    }
}