import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h3 className="mb-4">Bienvenido al sistema de reservas</h3>
                <p className="lead">
                    Solicita espacios del Instituto Cervantes de Utrecht de forma rápida y sencilla.
                </p>
                <p>
                    Explora la disponibilidad, elige una sala, completa el formulario y recibe tu presupuesto en PDF.
                </p>
                <Link to={"/disponibilidad"} className="btn btn-primary btn-lg mt-4">Comenzar Solicitud</Link>
            </div>
        </div>
    );
}