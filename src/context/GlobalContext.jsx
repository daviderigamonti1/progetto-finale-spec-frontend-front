import { createContext, useState } from "react";

import useDevices from "../hooks/useDevices";

export const GlobalContext = createContext();
const saved = localStorage.getItem("favorites");

export function GlobalProvider({ children }) {
    const { devices } = useDevices();
    const [favorites, setFavorites] = useState(saved ? JSON.parse(localStorage.getItem("favorites")) : []);

    const isFavorite = (device) => favorites.some(fav => fav.id === device.id);

    function toggleFavorites(device) {
        let updatedFavorites;

        if (isFavorite(device)) {
            updatedFavorites = [...favorites].filter(fav => fav.id !== device.id);
        } else {
            updatedFavorites = [...favorites, device];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    return (
        <GlobalContext.Provider value={{ devices, favorites, toggleFavorites, isFavorite }}>
            {children}
        </GlobalContext.Provider>
    )
}