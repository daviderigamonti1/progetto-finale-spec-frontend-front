import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useDevices(id1 = null, id2 = null) {
    const [devices, setDevices] = useState([]);
    const [device1, setDevice1] = useState(null);
    const [device2, setDevice2] = useState(null);

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


    useEffect(() => {
        if (!id1 || !id2) return;
        const fetchDetails = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(`${VITE_API_URL}/devices/${id1}`),
                    fetch(`${VITE_API_URL}/devices/${id2}`),
                ]);
                const data1 = await res1.json();
                const data2 = await res2.json();
                setDevice1(data1.device);
                setDevice2(data2.device);
            } catch (err) {
                console.error("Errore nel recupero dei dettagli dei dispositivi:", err);
            }
        };
        fetchDetails();
    }, [id1, id2]);

    return { devices, device1, device2 };
}