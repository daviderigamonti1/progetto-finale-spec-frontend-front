import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { FaStar, FaRegStar } from "react-icons/fa";

const { VITE_API_URL } = import.meta.env;

export default function DeviceDetail() {
    const { id } = useParams();
    const [deviceDetails, setDeviceDetails] = useState(null);

    const { toggleFavorites, favorites, setFavorites, isFavorite, removeDevice } = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/devices/${id}`);
                const data = await res.json();
                setDeviceDetails(data.device);
            } catch (err) {
                console.error("Errore nel recupero del dispositivo:", err)
            }
        }
        fetchDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await removeDevice(deviceDetails.id);
            alert("Dispositivo eliminato con successo.");

            const updatedFavorites = favorites.filter(fav => fav.id !== deviceDetails.id);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    if (!deviceDetails) return <p>Dispositivo non trovato</p>;

    return (
        <>
            <div className="device-detail-container">
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
                <button onClick={handleDelete} className='delete-button'>
                    Elimina Dispositivo
                </button>
            </div>
        </>
    );
}