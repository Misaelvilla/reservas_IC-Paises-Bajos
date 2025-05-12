import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
//reserva service

const handleConfirmar = async () => {
    // 1. Construir el JSON con los datos esperados por el backend
    const reservaData = {
        nombreSolicitante: formData.nombre,
        email: formData.email,
        institucion: formData.entidad,
        telefono: formData.telefono,
        descripcionUso: formData.descripcion,
        fecha,
        jornada,
        catering: formData.recursos.includes('Catering'),
        cafeTea: formData.recursos.includes('Cafe o Té'),
        otrasNecesidades: false,
        aceptacionCondiciones: true,
        personaResponsable: formData.nombre,
        estado: "pendiente",
        presupuesto: total,
        fechaSolicitud: new Date().toISOString().split('T')[0]
    };

    // 2. Generar el PDF con jsPDF
    const doc = new jsPDF();
    doc.text("Resumen de Reserva", 14, 20);
    autoTable(doc, {
        startY: 30,
        head: [['Campo', 'Valor']],
        body: [
            ['Fecha', fecha],
            ['Jornada', jornada],
            ['Sala', sala.nombre],
            ['Capacidad', sala.capacidad_maxima],
            ['Nombre', formData.nombre],
            ['Entidad', formData.entidad],
            ['Email', formData.email],
            ['Teléfono', formData.telefono],
            ['Descripción', formData.descripcion],
            ['Recursos', formData.recursos.join(', ')],
            ['Presupuesto estimado (€)', total],
        ]
    });
    const pdfBlob = doc.output('blob');

    // 3. Enviar PDF + JSON al backend como multipart/form-data
    const formDataCompleta = new FormData();
    formDataCompleta.append('datos', new Blob([JSON.stringify(reservaData)], { type: 'application/json' }));
    formDataCompleta.append('pdf', pdfBlob, 'reserva.pdf');

    try {
        await crearReserva(formDataCompleta);
        localStorage.setItem('reservaPdf', doc.output('datauristring'));
        navigate('/confirmacion');
    } catch (err) {
        console.error("Error al enviar la reserva:", err);
        alert("Error al enviar la reserva.");
    }
};


export default function ResumenPresupuesto() {
    const [formData, setFormData] = useState(null);
    const [sala, setSala] = useState(null);
    const [fecha, setFecha] = useState('');
    const [jornada, setJornada] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('formData');
        const salaData = localStorage.getItem('salaSeleccionada');
        const fechaData = localStorage.getItem('fechaSeleccionada');
        const jornadaData = localStorage.getItem('jornadaSeleccionada');

        if (data && salaData && fechaData && jornadaData) {
            setFormData(JSON.parse(data));
            setSala(JSON.parse(salaData));
            setFecha(fechaData);
            setJornada(jornadaData);
        } else {
            alert('Faltan datos para mostrar en resumen');
            navigate('/')
        }
    }, []);

    if (!formData || !sala) {
        return (
            <div className="container mt-5">
                <p>Cargando resumen...</p>
            </div>
        );
    }

    //presupuesto estimado básico 
    const baseSala = 100;
    const extraCost = { 'Catering': 50, 'Cafe o Té': 30 };

    const totalExtras = formData.recursos.reduce(
        (acc, r) => acc + (extraCost[r] || 0),
        0
    );

    const total = baseSala + totalExtras;

    return (
        <div className="container mt-5">
            <h2>Resumen de tu solicitud</h2>

            <div className="mt-4">
                <h5>Fecha y jornada:</h5>
                <p>{fecha} — {jornada}</p>

                <h5>Sala seleccionada:</h5>
                <p>{sala.nombre} (Capacidad: {sala.capacidad_maxima})</p>

                <h5>Datos del solicitante:</h5>
                <p><strong>Nombre:</strong> {formData.nombre}</p>
                <p><strong>Entidad:</strong> {formData.entidad}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Teléfono:</strong> {formData.telefono}</p>

                <h5>Descripción del evento:</h5>
                <p>{formData.descripcion}</p>

                <h5>Recursos adicionales:</h5>
                <ul>
                    {formData.recursos.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>

                <h4 className="mt-4">Presupuesto estimado: €{total}</h4>

                <div className="mt-4">
                    <button className="btn btn-secondary me-2" onClick={() => navigate('/solicitud')}>Editar</button>
                    <button className="btn btn-primary" onClick={() => navigate('/confirmacion')}>Confirmar y enviar</button>
                </div>
            </div>
        </div>
    );
}
