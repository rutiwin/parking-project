import runQuery from "../db/dal";

export async function getUniqueStreets(): Promise<string[]> {
    const q = `SELECT DISTINCT streetName FROM street`;
    
    try {
        const res = await runQuery(q);
        return res.map((row: any) => row.streetName);
    } catch (error) {
        console.error("Error fetching streets:", error);
        throw new Error("Failed to fetch streets. Please try again later.");
    }
}