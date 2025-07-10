import { useState, useContext, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  Grid
} from '@mui/material';

import { ContextBibliotecas } from '../../context/context';

export default function BibliotecaForm() {

  const { dispatchBibliotecas, bibliotecaToEdit, setBibliotecaToEdit } = useContext(ContextBibliotecas);

  const [formData, setFormData] = useState({
    id:  crypto.randomUUID(),
    nombre: '',
    direccion: ''
  });

  useEffect(() => {
    if (bibliotecaToEdit) {
      setFormData(bibliotecaToEdit);
    }
  }, [bibliotecaToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.id || !formData.nombre || !formData.direccion) {
      alert('Por favor, complete todos los campos');
      return;
    }

    if (bibliotecaToEdit) {
      dispatchBibliotecas({
        type: 'actualizar',
        biblioteca: formData
      });

      setBibliotecaToEdit(null);
    } else {
      dispatchBibliotecas({
        type: 'agregar',
        biblioteca: formData
      });
    }

    setFormData({
      id: crypto.randomUUID(),
      nombre: '',
      direccion: ''
    });
  };

  const handleCancel = () => {
    setBibliotecaToEdit(null);
    setFormData({
      id: crypto.randomUUID(),
      nombre: '',
      direccion: ''
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {bibliotecaToEdit ? 'Actualizar Biblioteca' : 'Agregar Biblioteca'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                size="small"
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                size="small"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                size="small"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              {bibliotecaToEdit ? 'Actualizar Biblioteca' : 'Guardar Biblioteca'}
            </Button>
            
            {bibliotecaToEdit && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleCancel}
                fullWidth
              >
                Cancelar
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}