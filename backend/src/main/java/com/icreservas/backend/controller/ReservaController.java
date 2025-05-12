package com.icreservas.backend.controller;

import com.icreservas.backend.model.Reserva;
import com.icreservas.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> listar() {
        return reservaRepository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearReserva(
            @RequestPart("datos") Reserva reserva,
            @RequestPart("pdf") MultipartFile pdf) {
        try {
            reserva.setEstado("pendiente");
            reserva.setFechaSolicitud(LocalDate.now());

            reservaRepository.save(reserva);

            // Aquí podrías guardar el PDF si lo deseas (en disco o base de datos)
            System.out.println("PDF recibido: " + pdf.getOriginalFilename());

            return ResponseEntity.ok("Reserva creada con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar la reserva");
        }
    }
}