import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useDevices() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/devices`);
                const data = await res.json();
                setDevices(data)
            } catch (err) {
                console.error("Errore nel recupero dei dispositivi:", err);
            }
        };
        fetchDevices();
    }, []);

    return { devices };
}