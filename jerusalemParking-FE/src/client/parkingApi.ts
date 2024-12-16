export async function getParking(street?: string, isOccupied?: boolean) {
    let url = `http://localhost:4700/api/v1/parking`;

    // Add street parameter if provided
    if (street) {
        url += `?street=${street}`;
    }

    // Add isOccupied parameter if it is explicitly true or false
    if (isOccupied !== undefined) {
        url += street ? `&isOccupied=${isOccupied}` : `?isOccupied=${isOccupied}`;
    }

    const res = await fetch(url);
    const resJ = await res.json();
    return resJ;
}

export async function changeParkingStatus(id: number, isOccupied: boolean): Promise<void> {
    const url = "http://localhost:4700/api/v1/occupied";
    
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isOccupied }),
    });

    if (!res.ok) {
        throw new Error(`Failed to update parking status: ${res.statusText}`);
    }
}
