import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { obtenerFranjasHorarias } from "../service/franjaHorariaService";

export default function Disponibilidad() {
    const [fecha, setFecha] = useState(null);
    const [jornada, setJornada] = useState('');
    const [franjas, setFranjas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerFranjasHorarias().then((data) => {
            setFranjas(Array.isArray(data) ? data : []);
        });
    }, []);

    const formatearHora = (horaStr) => {
        if (!horaStr) return "";
        return horaStr.slice(0, 5);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // compara solo fecha

        if (!fecha || fecha < hoy) {
            alert('Selecciona una fecha válida (hoy o futura)');
            return;
        }

        if (!jornada) {
            alert('Selecciona una jornada');
            return;
        }

        localStorage.setItem('fechaSeleccionada', fecha.toISOString().split('T')[0]);
        localStorage.setItem('jornadaSeleccionada', jornada);
        navigate('/explorador');
    };

    const esDiaHabil = (date) => {
        const dia = date.getDay();
        return dia !== 0;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Selecciona una fecha</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">Fecha</label>
                    <div>
                        <DatePicker
                            selected={fecha}
                            onChange={(date) => setFecha(date)}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona una fecha"
                            required
                            minDate={new Date()}
                            filterDate={esDiaHabil}
                        />
                    </div>

                </div>

                <div className="mb-3">
                    <label className="form-label">Jornada</label>
                    {franjas.map((f) => (
                        <div
                            key={f.id}
                            className={`form-check p-2 `}
                        >
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`franja-${f.id}`}
                                name="jornada"
                                value={f.nombre}
                                onChange={(e) => setJornada(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor={`franja-${f.id}`}>
                                {f.nombre}
                            </label>
                            <div className="text-muted small">
                                {formatearHora(f.hora_inicio)} - {formatearHora(f.hora_fin)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                        Explorar salas disponibles
                    </button>
                </div>
            </form>
        </div>
    );
}
