import { createContext } from "react";

import useDevices from "../hooks/useDevices";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const { devices, device1, device2 } = useDevices();

    return (
        <GlobalContext.Provider value={{ devices, device1, device2 }}>
            {children}
        </GlobalContext.Provider>
    )
}