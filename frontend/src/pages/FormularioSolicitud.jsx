import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormularioSolicitud() {
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [formData, setFormData] = useState(() => {
        const stored = localStorage.getItem('formData');
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...parsed,
                recursos: Array.isArray(parsed.recursos) ? parsed.recursos : []
            };
        }
        return {
            nombre: '',
            entidad: '',
            email: '',
            telefono: '',
            descripcion: '',
            recursos: []
        };
    });

    const recursosOpcionales = ['Catering', 'Cafe o Té'];

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const recursos = checked
                ? [...prev.recursos, value]
                : prev.recursos.filter((r) => r !== value);
            return { ...prev, recursos };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validación
        if (!formData.email || !formData.nombre || !formData.telefono) {
            alert("Por favor completa los campos obligatorios");
            return;
        }

        // guardar los datos en context o localstore
        localStorage.setItem('formData', JSON.stringify(formData));
        navigate('/resumen');
    };

    return (
        <div className="container mt-5">
            <h2>Formulario de solicitud</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Nombre del responsable (*)</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Entidad / Organización</label>
                    <input type="text" className="form-control" name="entidad" value={formData.entidad} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email (*)</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono (*)</label>
                    <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" name="descripcion" row="4" value={formData.descripcion} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Recursos adicionales</label>
                    {recursosOpcionales.map((recurso, i) => (
                        <div className="form-check" key={i}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={recurso}
                                id={`recurso-${i}`}
                                onChange={handleCheckbox}
                                checked={formData.recursos.includes(recurso)}
                            />
                            <label className="form-check-label" htmlFor={`recurso-${i}`}>
                                {recurso}
                            </label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary">Ver resumen</button>
            </form>
            <p>Rellena los campos necesarios para hacer tu reserva.</p>
        </div>
    );
}
