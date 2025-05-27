import { createContext } from "react";

import useDevices from "../hooks/useDevices";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const deviceData = useDevices();

    return (
        <GlobalContext.Provider value={{ devices: deviceData }}>
            {children}
        </GlobalContext.Provider>
    )
}