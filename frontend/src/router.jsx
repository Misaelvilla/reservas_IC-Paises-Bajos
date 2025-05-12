import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Disponibilidad from './pages/Disponibilidad';
import ExploradorSalas from './pages/ExploradorSalas';
import FormularioSolicitud from './pages/FormularioSolicitud';
import ResumenPresupuesto from './pages/ResumenPresupuesto';
import Confirmacion from './pages/Confirmacion';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/disponibilidad" element={<Disponibilidad />} />
                <Route path="/explorador" element={<ExploradorSalas />} />
                <Route path="/solicitud" element={<FormularioSolicitud />} />
                <Route path="/resumen" element={<ResumenPresupuesto />} />
                <Route path="/confirmacion" element={<Confirmacion />} />
            </Routes>
        </Router>
    );
}
