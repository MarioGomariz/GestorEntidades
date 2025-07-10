import { useContext } from "react";
import { ContextBibliotecas } from "../../context/context";
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  Button
} from "@mui/material";

export default function Bibliotecas() {

  const { bibliotecas, dispatchBibliotecas, setBibliotecaToEdit } = useContext(ContextBibliotecas);

  const handleDelete = (biblioteca) => {
    dispatchBibliotecas({
      type: 'eliminar',
      biblioteca: biblioteca
    });
  };

  const handleEdit = (biblioteca) => {
    setBibliotecaToEdit({...biblioteca});
  };

  return (
    <>

      {bibliotecas.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">No hay bibliotecas registradas.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de bibliotecas">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dirección</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bibliotecas.map((biblioteca) => (
                <TableRow 
                  key={biblioteca.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                >
                  <TableCell component="th" scope="row">
                    {biblioteca.id}
                  </TableCell>
                  <TableCell>{biblioteca.nombre}</TableCell>
                  <TableCell>{biblioteca.direccion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(biblioteca)}
                      sx={{ mr: 2 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(biblioteca)}
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
