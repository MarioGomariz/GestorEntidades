import { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { ContextLibros } from "../../context/context";

export default function LibroForm() {
  const { dispatchLibros, libroToEdit, setLibroToEdit } =
    useContext(ContextLibros);

  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    nombre: "",
    descripcion: "",
    fechaIngreso: new Date().toISOString().split("T")[0],
    genero: "",
  });


  useEffect(() => {
    if (libroToEdit) {
      setFormData(libroToEdit);
    }
  }, [libroToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.id ||
      !formData.nombre ||
      !formData.descripcion ||
      !formData.fechaIngreso ||
      !formData.genero
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (libroToEdit) {

      dispatchLibros({
        type: "actualizar",
        libro: formData,
      });


      setLibroToEdit(null);
    } else {

      dispatchLibros({
        type: "agregar",
        libro: formData,
      });
    }

    setFormData({
      id: crypto.randomUUID(),
      nombre: "",
      descripcion: "",
      fechaIngreso: new Date().toISOString().split("T")[0],
      genero: "",
    });
  };

  const handleCancel = () => {
    setLibroToEdit(null);
    setFormData({
      id: crypto.randomUUID(),
      nombre: "",
      descripcion: "",
      fechaIngreso: new Date().toISOString().split("T")[0],
      genero: "",
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {libroToEdit ? "Actualizar Libro" : "Agregar Libro"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={formData.id}
              variant="outlined"
              margin="normal"
              required
              size="small"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              fullWidth
              label="Fecha de Ingreso"
              name="fechaIngreso"
              type="date"
              value={formData.fechaIngreso}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth margin="normal" required size="small">
              <InputLabel id="genero-label">Género</InputLabel>
              <Select
                labelId="genero-label"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                label="Género"
              >
                <MenuItem value="Terror">Terror</MenuItem>
                <MenuItem value="Fantasia">Fantasía</MenuItem>
                <MenuItem value="Comedia">Comedia</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
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

            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={10}
              size="small"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          {libroToEdit && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              fullWidth
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {libroToEdit ? "Actualizar Libro" : "Guardar Libro"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
