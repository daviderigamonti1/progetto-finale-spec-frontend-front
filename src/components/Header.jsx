import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { favorites } = useContext(GlobalContext);
    const [showFavorites, setShowFavorites] = useState(false);

    return (
        <>
            <h1>Header</h1>

            {/* Dispositivi preferiti */}
            <button onClick={() => setShowFavorites(prev => !prev)}>
                {showFavorites ? "Nascondi preferiti" : "Mostra preferiti"}
            </button>
            {showFavorites && (
                favorites.length > 0 ? (
                    <ul>
                        {favorites.map((favorite) => (
                            <li key={favorite.id}>
                                <Link to={`/devices/${favorite.id}`}>
                                    {favorite.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun dispositivo nei preferiti.</p>
                )
            )}
        </>
    )
}