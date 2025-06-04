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

    const addDevice = async newDevice => {
        const response = await fetch(`${VITE_API_URL}/devices`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDevice)
        });
        const { success, message, device } = await response.json();
        if (!success) throw new Error(message);

        setDevices(prev => [...prev, device])
    }

    const removeDevice = async deviceId => {
        const response = await fetch(`${VITE_API_URL}/devices/${deviceId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);
        setDevices(prev => prev.filter(d => d.id !== deviceId));
    }

    return { devices, addDevice, removeDevice };
}