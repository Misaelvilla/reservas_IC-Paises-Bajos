import React from "react";

export default function SalaCard({ sala, seleccionada, onSelect }) {
    const isActive = seleccionada?.id === sala.id;
    const cardStyle = {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "10px",
        backgroundColor: isActive ? "#5df0e3" : "#e0e0e0",
        border: isActive ? "2px solid #00a9a5" : "1px solid transparent",
        padding: "1rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease"
    };
    return (
        <div style={cardStyle} onClick={() => onSelect(sala)}>
            <strong>{sala.nombre}</strong>
            <span>{sala.capacidad_maxima} pers.</span>
            {isActive && (
                <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", textAlign: "center" }}>
                    <p>{sala.descripcion}</p>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {sala.recursos.map((r, i) => (
                            <li key={i}>• {r}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

