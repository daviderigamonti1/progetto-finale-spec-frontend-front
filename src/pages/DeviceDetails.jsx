import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

import { FaStar, FaRegStar } from "react-icons/fa";

const { VITE_API_URL } = import.meta.env;

export default function DeviceDetail() {
    const { id } = useParams();
    const [deviceDetails, setDeviceDetails] = useState(null);
    const { favorites, toggleFavorites, isFavorite } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`${VITE_API_URL}/devices/${id}`)
            .then(res => res.json())
            .then(data => setDeviceDetails(data.device))
            .catch(err => console.error(err))
    }, [id]);


    if (!deviceDetails) return <p>Dispositivo non trovato</p>;
    return (
        <>
            <div className="device-list-container">
                <h1>Dettaglio Dispositivo</h1>
                <div className="device-detail-card card">
                    <h3>{deviceDetails.title}</h3>
                    <p><strong>Categoria:</strong> {deviceDetails.category}</p>
                    <p><strong>Marca:</strong> {deviceDetails.brand}</p>
                    <p><strong>Modello:</strong> {deviceDetails.model}</p>
                    <p><strong>Anno di rilascio:</strong> {deviceDetails.releaseYear}</p>
                    <p><strong>Prezzo:</strong> €{deviceDetails.price}</p>
                    <button onClick={() => toggleFavorites(deviceDetails)}>
                        {isFavorite(deviceDetails) ? <FaStar /> : <FaRegStar />}
                    </button>
                </div>
                <Link to="/" className="back-link">← Torna indietro</Link>
            </div>
        </>
    );
}