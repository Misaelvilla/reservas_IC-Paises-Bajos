import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { obtenerSalas } from "../service/salasService";
import SalaCard from "../components/SalaCard";

const mockSalasPrimeraPlanta = [
    {
        id: 1,
        nombre: "Aula 1.3",
        descripcion: "Aula grande ideal para grupos numerosos.",
        capacidad_maxima: 30,
        planta: "Primera planta",
        tipo: "Aula",
        recursos: ["Pizarra", "Proyector"],
        alquilable: true,
        gridColumn: "1 / 3",
        gridRow: "1"
    },
    {
        id: 2,
        nombre: "Aula 1.2",
        descripcion: "Aula mediana para clases regulares.",
        capacidad_maxima: 20,
        planta: "Primera planta",
        tipo: "Aula",
        recursos: ["Pizarra", "WiFi"],
        alquilable: true,
        gridColumn: "3 / 4",
        gridRow: "1"
    },
    {
        id: 3,
        nombre: "Aula 1.4",
        descripcion: "Aula para clases pequeñas o tutorías.",
        capacidad_maxima: 15,
        planta: "Primera planta",
        tipo: "Aula",
        recursos: ["Pizarra", "Proyector"],
        alquilable: true,
        gridColumn: "1 / 3",
        gridRow: "2"
    },
    {
        id: 4,
        nombre: "Aula 1.1",
        descripcion: "Sala adecuada para reuniones o grupos pequeños.",
        capacidad_maxima: 12,
        planta: "Primera planta",
        tipo: "Aula",
        recursos: ["Pizarra", "TV"],
        alquilable: true,
        gridColumn: "4 / 5",
        gridRow: "2"
    },
    {
        id: 5,
        nombre: "Salón de Actos",
        descripcion: "Espacio amplio para conferencias y eventos.",
        capacidad_maxima: 100,
        planta: "Primera planta",
        tipo: "Salón",
        recursos: ["Proyector", "Micrófono", "Escenario"],
        alquilable: true,
        gridColumn: "4 / 7",
        gridRow: "1 / 3"
    }
];

const mockSalasSegundaPlanta = [
    {
        id: 6,
        nombre: "Aula 2.2",
        descripcion: "Aula amplia para clases regulares o talleres grupales.",
        capacidad_maxima: 20,
        planta: "Segunda planta",
        tipo: "Aula",
        recursos: ["Pizarra", "Proyector"],
        alquilable: true,
        gridColumn: "1 / 2",
        gridRow: "1"
    },
    {
        id: 7,
        nombre: "Aula 2.3",
        descripcion: "Aula adecuada para sesiones reducidas o tutorías.",
        capacidad_maxima: 15,
        planta: "Segunda planta",
        tipo: "Aula",
        recursos: ["Pizarra"],
        alquilable: true,
        gridColumn: "1 / 2",
        gridRow: "2"
    },
    {
        id: 8,
        nombre: "Aula 2.1",
        descripcion: "Sala grande ideal para presentaciones o cursos con equipos.",
        capacidad_maxima: 25,
        planta: "Segunda planta",
        tipo: "Aula",
        recursos: ["Pizarra", "Proyector", "TV"],
        alquilable: true,
        gridColumn: "2 / 4",
        gridRow: "1 / 3"
    }
];

const mockSalas = [
    ...mockSalasPrimeraPlanta,
    ...mockSalasSegundaPlanta
];


export default function ExploradorSalas() {
    const [salas, setSalas] = useState([]);
    const [salaSeleccionada, setSalaSeleccionada] = useState(null);
    const navigate = useNavigate();
    const [plantaActual, setPlantaActual] = useState('');
    const [plantasDisponibles, setPlantasDisponibles] = useState([]);



    useEffect(() => {
        obtenerSalas()
            .then(data => {
                let procesadas = [];

                if (!Array.isArray(data) || data.length === 0) {
                    procesadas = mockSalas;
                } else {
                    procesadas = data
                        .filter(s => s.alquilable === true)
                        .map(s => ({
                            ...s,
                            recursos: s.recursos_disponibles
                                ? s.recursos_disponibles.split(',').map(r => r.trim())
                                : [],
                            gridColumn: s.grid_column || 'auto',
                            gridRow: s.grid_row || 'auto'
                        }));

                }

                const plantas = [...new Set(procesadas.map(s => s.planta))];
                setPlantasDisponibles(plantas);
                setPlantaActual(plantas[0]);
                setSalas(procesadas);
            })
            .catch(err => {
                console.error('Error al cargar salas. Usando mock.', err);
                setSalas(mockSalas);
                const plantas = [...new Set(mockSalas.map(s => s.planta || 'Desconocida'))];
                setPlantasDisponibles(plantas);
                setPlantaActual(plantas[0]);
            });
    }, []);

    const salasPorPlanta = salas.filter(s => s.planta === plantaActual);

    const cambiarPlanta = (dir) => {
        const i = plantasDisponibles.indexOf(plantaActual);
        if (dir === "anterior" && i > 0) setPlantaActual(plantasDisponibles[i - 1]);
        if (dir === "siguiente" && i < plantasDisponibles.length - 1) setPlantaActual(plantasDisponibles[i + 1]);
    };

    const handleContinuar = () => {
        if (salaSeleccionada) {
            localStorage.setItem('salaSeleccionada', JSON.stringify(salaSeleccionada));
            navigate('/solicitud');
        } else {
            alert('Selecciona una sala para continuar');
        }
    };

    return (
        <div className="container mt-5 "
            style={{
                width: "90vw",             // 90% del ancho del viewport
                maxWidth: "920px",        // opcional: tope para pantallas grandes
                height: "85vh",            // 85% del alto del viewport
                margin: "0 auto",          // centrado
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // reparte el espacio
                overflow: "hidden"           // evita expansión por contenido
            }}
        >
            <h2 className="text-center">Salas disponibles</h2>

            <div className="d-flex justify-content-between align-items-center my-4">
                <h4 className="align-baseline">{plantaActual}</h4>
                <div className="align-content-end">
                    <button className="btn btn-outline-secondary me-2" onClick={() => cambiarPlanta("anterior")} disabled={plantasDisponibles.indexOf(plantaActual) === 0}>↑</button>
                    <button className="btn btn-outline-secondary" onClick={() => cambiarPlanta("siguiente")} disabled={plantasDisponibles.indexOf(plantaActual) === plantasDisponibles.length - 1}>↓</button>
                </div>
            </div>

            <div
                className="sala-grid mx-auto "
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                    gap: "1rem",
                    width: "100%",
                    maxWidth: "900px",
                    height: "400px",
                    backgroundColor: "#eee",
                    padding: "1rem",
                    borderRadius: "12px"
                }}
            >
                {salasPorPlanta.map(sala => (
                    <div
                        key={sala.id}
                        style={{
                            gridColumn: sala.gridColumn,
                            gridRow: sala.gridRow
                        }}
                    >
                        <SalaCard
                            sala={sala}
                            seleccionada={salaSeleccionada}
                            onSelect={setSalaSeleccionada}
                        />
                    </div>
                ))}
            </div>


            <div className="text-center mt-4">
                <button className="btn btn-info px-4 py-2 rounded-pill" onClick={handleContinuar}>
                    Seleccionar
                </button>
            </div>
        </div>
    );
}