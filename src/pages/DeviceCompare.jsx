import { useParams } from "react-router-dom";

import useDevices from "../hooks/useDevices";

export default function DeviceCompare() {
    const { id1, id2 } = useParams();
    const { device1, device2 } = useDevices(id1, id2);

    if (!device1 || !device2) {
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

                {/* Dispositivo 1 */}
                <tr>
                    <td>{device1.title}</td>
                    <td>{device1.category}</td>
                    <td>{device1.brand}</td>
                    <td>{device1.releaseYear}</td>
                    <td>{device1.price}</td>
                </tr>

                {/* Dispositivo 2 */}
                <tr>
                    <td>{device2.title}</td>
                    <td>{device2.category}</td>
                    <td>{device2.brand}</td>
                    <td>{device2.releaseYear}</td>
                    <td>{device2.price}</td>
                </tr>
            </tbody>
        </table>
    )
}