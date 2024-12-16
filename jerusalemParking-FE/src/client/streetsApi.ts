export async function getStreets() {
    const url = "http://localhost:4700/api/v1/streets";
    const res = await fetch(url);
    const resJ = await res.json();
    return resJ;
}