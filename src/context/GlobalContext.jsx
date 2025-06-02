import { createContext, useState } from "react";

import useDevices from "../hooks/useDevices";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const { devices } = useDevices();
    const [favorites, setFavorites] = useState([]);

    const isFavorite = (device) => favorites.some(fav => fav.id === device.id);
    function toggleFavorites(device) {
        if (isFavorite(device)) {
            setFavorites(prev => prev.filter(fav => fav.id !== device.id));
        } else {
            setFavorites(prev => [...prev, device]);
        }
    }

    return (
        <GlobalContext.Provider value={{ devices, favorites, toggleFavorites, isFavorite }}>
            {children}
        </GlobalContext.Provider>
    )
}