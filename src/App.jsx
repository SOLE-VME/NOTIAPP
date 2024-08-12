import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Articulos } from "./components/Articulos";
import { VerArticulo } from "./components/Articulos/VerArticulo";
import { CrearArticulo } from "./components/Articulos/CrearArticulo";
import { Login } from "./routes/Login";
import Navbar from "./components/NavBar";
import { EditarArticulo } from "./components/Articulos/EditarArticulo";
import { ProtectedRoute } from "./contexts/ProtectedRoute";
import {Perfiles} from "./components/Profiles/Perfiles";

const App = () => {
    return (
        <Router>
            <Navbar /> 
            <Routes>
                <Route path="/" element={<Articulos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/articles/:id" element={<VerArticulo />} />
                <Route path="/articles/nuevo-articulo" element={ <ProtectedRoute> <CrearArticulo /> </ProtectedRoute>} />
                <Route path="/articles/editar/:id" element={<ProtectedRoute><EditarArticulo /></ProtectedRoute>} />
                <Route path="/perfil" element={<Perfiles />}></Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        </Router>
    );
};

export default App;

