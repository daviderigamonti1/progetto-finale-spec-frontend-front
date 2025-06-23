import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env;

export default function DeviceCompare() {
    const { ids } = useParams();

    const [devicesCompared, setDevicesCompared] = useState(null);

    async function fetchJson(url) {
        const response = await fetch(url);
        const obj = await response.json();
        return obj;
    }

    useEffect(() => {
        const idsArray = ids?.split(",") || [];

        if (idsArray.length < 2) {
            setDevicesCompared(null);
            return;
        }

        const fetchDetails = async () => {
            try {
                const promises = idsArray.map(id => fetchJson(`${VITE_API_URL}/devices/${id}`));
                const results = await Promise.all(promises);
                setDevicesCompared(results.map(d => d.device));
            } catch (err) {
                console.error("Errore nel recupero dei dettagli dei dispositivi:", err);
            }
        };
        fetchDetails();
    }, [ids]);

    if (!devicesCompared || devicesCompared.length < 2) {
        return <p>Seleziona almeno due dispositivi per poter effettuare una comparazione.</p>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Titolo</th>
                        <th>Categoria</th>
                        <th>Brand</th>
                        <th>Anno di uscita</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>
                <tbody>
                    {devicesCompared.map(device => (
                        <tr key={device.id}>
                            <td>{device.title}</td>
                            <td>{device.category}</td>
                            <td>{device.brand}</td>
                            <td>{device.releaseYear}</td>
                            <td>{device.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/" className="back-link">← Torna indietro</Link>
        </>
    )
}