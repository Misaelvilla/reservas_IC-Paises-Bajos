import { useEffect, useState } from "react";

export default function Confirmacion() {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const pdf = localStorage.getItem('reservaPdf');
        if (pdf) setPdfUrl(pdf);
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h2>Confirmación</h2>
            <p>Tu solicitud ha sido enviada. Pronto recibirás una respuesta por correo.</p>
            {pdfUrl && (
                <a
                    href={pdfUrl}
                    download="resumen_reserva.pdf"
                    className="btn btn-success mt-3"
                >
                    Descargar PDF
                </a>
            )}
        </div>
    );
}
