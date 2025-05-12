package com.icreservas.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloqueoHorario {
    // id|fecha|hora_inicio|hora_fin|motivo|sala_id|
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate hora_inicio;
    private LocalDate hora_fin;

    private String motivo;

    @ManyToOne
    @JoinColumn(name = "sala_id", nullable = false)
    private Sala sala;

}
