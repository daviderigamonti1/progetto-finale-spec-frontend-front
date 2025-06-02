import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env;

export default function DeviceCompare() {
    const { ids } = useParams();
    const idsArray = ids?.split(",") || [];

    const [devicesCompared, setDevicesCompared] = useState(null);

    useEffect(() => {
        if (idsArray.length < 2) {
            setDevicesCompared(null);
            return;
        }

        const fetchDetails = async () => {
            try {
                const promises = idsArray.map(id => fetch(`${VITE_API_URL}/devices/${id}`));
                const responses = await Promise.all(promises);
                const data = await Promise.all(responses.map(res => res.json()));
                setDevicesCompared(data.map(d => d.device));
            } catch (err) {
                console.error("Errore nel recupero dei dettagli dei dispositivi:", err);
            }
        };
        fetchDetails();
    }, [ids]);

    if (!devicesCompared) {
        return <p>Caricamento dei dispositivi in corso...</p>;
    }

    return (
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
    )
}