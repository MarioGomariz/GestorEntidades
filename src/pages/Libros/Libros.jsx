import { useContext } from "react";
import { ContextLibros } from "../../context/context";
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  Typography,
  Button
} from "@mui/material";

export default function Libros() {

  const { libros, dispatchLibros, setLibroToEdit } = useContext(ContextLibros);


  const handleDelete = (libro) => {
    dispatchLibros({
      type: 'eliminar',
      libro: libro
    });
  };

  const handleEdit = (libro) => {
    setLibroToEdit({...libro});
  };

  return (
    <>
      {libros.length === 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1">No hay libros registrados.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de libros">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Ingreso</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Género</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libros.map((libro) => (
                <TableRow 
                  key={libro.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                >
                  <TableCell component="th" scope="row">
                    {libro.id}
                  </TableCell>
                  <TableCell>{libro.nombre}</TableCell>
                  <TableCell>
                    {libro.descripcion.length > 100 
                      ? `${libro.descripcion.substring(0, 100)}...` 
                      : libro.descripcion}
                  </TableCell>
                  <TableCell>{new Date(libro.fechaIngreso).toLocaleDateString()}</TableCell>
                  <TableCell>{libro.genero}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(libro)}
                      sx={{ mr: 2 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(libro)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}