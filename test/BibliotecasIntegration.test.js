import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContextBibliotecas } from '../src/context/context';
import { useReducer, useState } from 'react';
import { bibliotecaReducer } from '../src/reducers/bibliotecaReducer';
import BibliotecaForm from '../src/pages/Bibliotecas/BibliotecaForm';
import Bibliotecas from '../src/pages/Bibliotecas/Bibliotecas';

// Componente wrapper que simula la aplicación completa con contexto
function BibliotecasApp() {
  const [bibliotecas, dispatchBibliotecas] = useReducer(bibliotecaReducer, []);
  const [bibliotecaToEdit, setBibliotecaToEdit] = useState(null);

  return (
    <ContextBibliotecas.Provider 
      value={{ bibliotecas, dispatchBibliotecas, bibliotecaToEdit, setBibliotecaToEdit }}
    >
      <div>
        <h1>Bibliotecas</h1>
        <BibliotecaForm />
        <Bibliotecas />
      </div>
    </ContextBibliotecas.Provider>
  );
}

describe('Bibliotecas - Test de Integración', () => {

  test('test 1: debe renderizar el formulario y la lista vacía inicialmente', () => {
    render(<BibliotecasApp />);
    
    // Verificar que el formulario existe
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar Biblioteca/i })).toBeInTheDocument();
    
    // Verificar que la lista está vacía
    expect(screen.getByText(/No hay bibliotecas registradas/i)).toBeInTheDocument();
  });

  test('test 2: debe agregar una biblioteca al llenar y enviar el formulario', async () => {
    render(<BibliotecasApp />);
    
    // Llenar el formulario
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const direccionInput = screen.getByLabelText(/Dirección/i);
    
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca Central' } });
    fireEvent.change(direccionInput, { target: { value: 'Calle Principal 123' } });
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /Guardar Biblioteca/i });
    fireEvent.click(submitButton);
    
    // Verificar que la biblioteca aparece en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca Central')).toBeInTheDocument();
      expect(screen.getByText('Calle Principal 123')).toBeInTheDocument();
    });
    
    // Verificar que el mensaje de lista vacía ya no está
    expect(screen.queryByText(/No hay bibliotecas registradas/i)).not.toBeInTheDocument();
    
    // Verificar que el formulario se limpió
    expect(nombreInput.value).toBe('');
    expect(direccionInput.value).toBe('');
  });

  test('test 3: debe agregar múltiples bibliotecas y mostrarlas en la tabla', async () => {
    render(<BibliotecasApp />);
    
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const direccionInput = screen.getByLabelText(/Dirección/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Biblioteca/i });
    
    // Agregar primera biblioteca
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca Central' } });
    fireEvent.change(direccionInput, { target: { value: 'Calle 1' } });
    fireEvent.click(submitButton);
    
    // Agregar segunda biblioteca
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca del Norte' } });
    fireEvent.change(direccionInput, { target: { value: 'Calle 2' } });
    fireEvent.click(submitButton);
    
    // Agregar tercera biblioteca
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca del Sur' } });
    fireEvent.change(direccionInput, { target: { value: 'Calle 3' } });
    fireEvent.click(submitButton);
    
    // Verificar que todas las bibliotecas están en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca Central')).toBeInTheDocument();
      expect(screen.getByText('Biblioteca del Norte')).toBeInTheDocument();
      expect(screen.getByText('Biblioteca del Sur')).toBeInTheDocument();
      expect(screen.getByText('Calle 1')).toBeInTheDocument();
      expect(screen.getByText('Calle 2')).toBeInTheDocument();
      expect(screen.getByText('Calle 3')).toBeInTheDocument();
    });
  });

  test('test 4: debe eliminar una biblioteca al hacer click en Eliminar', async () => {
    render(<BibliotecasApp />);
    
    // Agregar una biblioteca
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const direccionInput = screen.getByLabelText(/Dirección/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Biblioteca/i });
    
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca a Eliminar' } });
    fireEvent.change(direccionInput, { target: { value: 'Calle Temporal' } });
    fireEvent.click(submitButton);
    
    // Verificar que la biblioteca está en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca a Eliminar')).toBeInTheDocument();
    });
    
    // Hacer click en el botón Eliminar
    const eliminarButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(eliminarButton);
    
    // Verificar que la biblioteca fue eliminada
    await waitFor(() => {
      expect(screen.queryByText('Biblioteca a Eliminar')).not.toBeInTheDocument();
      expect(screen.getByText(/No hay bibliotecas registradas/i)).toBeInTheDocument();
    });
  });

  test('test 5: debe editar una biblioteca existente', async () => {
    render(<BibliotecasApp />);
    
    // Agregar una biblioteca
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const direccionInput = screen.getByLabelText(/Dirección/i);
    let submitButton = screen.getByRole('button', { name: /Guardar Biblioteca/i });
    
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca Original' } });
    fireEvent.change(direccionInput, { target: { value: 'Direccion Original' } });
    fireEvent.click(submitButton);
    
    // Verificar que la biblioteca está en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca Original')).toBeInTheDocument();
    });
    
    // Hacer click en Editar
    const editarButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editarButton);
    
    // Verificar que el formulario cambió a modo edición
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Actualizar Biblioteca/i })).toBeInTheDocument();
    });
    
    // Verificar que los valores están precargados
    expect(nombreInput.value).toBe('Biblioteca Original');
    expect(direccionInput.value).toBe('Direccion Original');
    
    // Modificar los valores
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca Actualizada' } });
    fireEvent.change(direccionInput, { target: { value: 'Direccion Nueva' } });
    
    // Enviar el formulario de actualización
    const actualizarButton = screen.getByRole('button', { name: /Actualizar Biblioteca/i });
    fireEvent.click(actualizarButton);
    
    // Verificar que los datos se actualizaron en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca Actualizada')).toBeInTheDocument();
      expect(screen.getByText('Direccion Nueva')).toBeInTheDocument();
      expect(screen.queryByText('Biblioteca Original')).not.toBeInTheDocument();
      expect(screen.queryByText('Direccion Original')).not.toBeInTheDocument();
    });
    
    // Verificar que el formulario volvió al modo agregar
    expect(screen.getByRole('button', { name: /Guardar Biblioteca/i })).toBeInTheDocument();
  });

  test('test 6: flujo completo: agregar, editar y eliminar bibliotecas', async () => {
    render(<BibliotecasApp />);
    
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const direccionInput = screen.getByLabelText(/Dirección/i);
    
    // 1. Agregar primera biblioteca
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca 1' } });
    fireEvent.change(direccionInput, { target: { value: 'Dirección 1' } });
    fireEvent.click(screen.getByRole('button', { name: /Guardar Biblioteca/i }));
    
    // 2. Agregar segunda biblioteca
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca 2' } });
    fireEvent.change(direccionInput, { target: { value: 'Dirección 2' } });
    fireEvent.click(screen.getByRole('button', { name: /Guardar Biblioteca/i }));
    
    // Verificar que ambas están en la lista
    await waitFor(() => {
      expect(screen.getByText('Biblioteca 1')).toBeInTheDocument();
      expect(screen.getByText('Biblioteca 2')).toBeInTheDocument();
    });
    
    // 3. Editar la primera biblioteca
    const editButtons = screen.getAllByRole('button', { name: /Editar/i });
    fireEvent.click(editButtons[0]);
    
    await waitFor(() => {
      expect(nombreInput.value).toBe('Biblioteca 1');
    });
    
    fireEvent.change(nombreInput, { target: { value: 'Biblioteca 1 Modificada' } });
    fireEvent.click(screen.getByRole('button', { name: /Actualizar Biblioteca/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Biblioteca 1 Modificada')).toBeInTheDocument();
    });
    
    // 4. Eliminar la segunda biblioteca
    const deleteButtons = screen.getAllByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButtons[1]);
    
    await waitFor(() => {
      expect(screen.queryByText('Biblioteca 2')).not.toBeInTheDocument();
      expect(screen.getByText('Biblioteca 1 Modificada')).toBeInTheDocument();
    });
  });
});
