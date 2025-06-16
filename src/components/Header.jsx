import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    const { favorites } = useContext(GlobalContext);
    const [showFavorites, setShowFavorites] = useState(false);

    return (
        <header>
            <nav className="nav-links">
                <NavLink to={"/"} className="nav-link">Lista Dispositivi</NavLink>
                <NavLink to={"/add"} className="nav-link">Aggiungi Dispositivo</NavLink>
            </nav>

            <div className="favorites-toggle">
                {/* Dispositivi preferiti */}
                <button className="toggle-button" onClick={() => setShowFavorites(prev => !prev)}>
                    {showFavorites ? "Nascondi preferiti" : "Mostra preferiti"}
                </button>
                {showFavorites && (
                    <div className="favorites-list">
                        {favorites.length > 0 ? (
                            <ul>
                                {favorites.map((favorite) => (
                                    <li key={favorite.id}>
                                        <Link to={`/devices/${favorite.id}`} className="favorite-link">
                                            {favorite.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-favorites">Nessun dispositivo nei preferiti.</p>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}