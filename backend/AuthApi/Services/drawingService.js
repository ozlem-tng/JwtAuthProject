import api from "../api/axios";

console.log(api);

export const savePoint = async (geometry) => {
    return await api.post("/points", {
        geometry
    });
};

export const saveLine = async (geometry) => {
    return await api.post("/lines", {
        geometry
    });
};

export const savePolygon = async (geometry) => {
    return await api.post("/polygons", {
        geometry
    });
};