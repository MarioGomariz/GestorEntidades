import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Libros from "./pages/Libros/Libros";
import Bibliotecas from "./pages/Bibliotecas/Bibliotecas";
import { ContextLibros, ContextBibliotecas } from "./context/context";
import { useReducer, useEffect, useState } from "react";
import { librosReducer } from "./reducers/libroReducer";
import { bibliotecaReducer } from "./reducers/bibliotecaReducer";
import LibroForm from "./pages/Libros/LibroForm";
import BibliotecaForm from "./pages/Bibliotecas/BibliotecaForm";
import { Container, Typography } from "@mui/material";

const initialLibros = JSON.parse(localStorage.getItem("libros")) || [];
const initialBibliotecas =
  JSON.parse(localStorage.getItem("bibliotecas")) || [];

export default function AppRouter() {
  const [libros, dispatchLibros] = useReducer(librosReducer, initialLibros);
  const [bibliotecas, dispatchBibliotecas] = useReducer(
    bibliotecaReducer,
    initialBibliotecas
  );
  const [libroToEdit, setLibroToEdit] = useState(null);
  const [bibliotecaToEdit, setBibliotecaToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("libros", JSON.stringify(libros));
    localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas));
  }, [libros, bibliotecas]);

  const LibrosWithContext = () => (
    <ContextLibros.Provider value={{ libros, dispatchLibros, libroToEdit, setLibroToEdit }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Libros
        </Typography>

        <LibroForm />
        <Libros />

      </Container>
    </ContextLibros.Provider>
  );

  const BibliotecasWithContext = () => (
    <ContextBibliotecas.Provider value={{ bibliotecas, dispatchBibliotecas, bibliotecaToEdit, setBibliotecaToEdit }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Bibliotecas
        </Typography>

        <BibliotecaForm />
        <Bibliotecas />

      </Container>
    </ContextBibliotecas.Provider>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/libros" element={<LibrosWithContext />} />
      <Route path="/bibliotecas" element={<BibliotecasWithContext />} />
    </Routes>
  );
}
