import { createContext, useState, useMemo } from "react";

import useDevices from "../hooks/useDevices";

export const GlobalContext = createContext();
const saved = localStorage.getItem("favorites");

export function GlobalProvider({ children }) {
    const { devices, addDevice, removeDevice } = useDevices();
    const [favorites, setFavorites] = useState(saved ? JSON.parse(saved) : []);

    const uniqueCategories = useMemo(() => {
        return devices.reduce((acc, device) => {
            if (device.category && !acc.includes(device.category)) {
                acc.push(device.category);
            }
            return acc;
        }, []);
    }, [devices]);

    const isFavorite = (device) => favorites.some(fav => fav.id === device.id);

    function toggleFavorites(device) {
        let updatedFavorites;

        if (isFavorite(device)) {
            updatedFavorites = favorites.filter(fav => fav.id !== device.id);
        } else {
            updatedFavorites = [...favorites, device];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    return (
        <GlobalContext.Provider value={{ devices, addDevice, removeDevice, uniqueCategories, favorites, setFavorites, toggleFavorites, isFavorite }}>
            {children}
        </GlobalContext.Provider>
    )
}