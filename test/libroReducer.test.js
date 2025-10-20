import { librosReducer } from '../src/reducers/libroReducer';

describe('librosReducer - Pruebas Unitarias', () => {
  
  
  const estadoInicial = [
    {
      id: '1',
      nombre: 'El Resplandor',
      descripcion: 'Novela de terror de Stephen King',
      fechaIngreso: '2024-01-15',
      genero: 'Terror'
    },
    {
      id: '2',
      nombre: 'El Hobbit',
      descripcion: 'Aventura fantástica de J.R.R. Tolkien',
      fechaIngreso: '2024-02-20',
      genero: 'Fantasia'
    }
  ];

  test('agregar un nuevo libro ', () => {
    const nuevoLibro = {
      id: '3',
      nombre: 'Cien años de soledad',
      descripcion: 'Obra maestra de Gabriel García Márquez',
      fechaIngreso: '2024-03-10',
      genero: 'Fantasia'
    };

    const action = {
      type: 'agregar',
      libro: nuevoLibro
    };

    const resultado = librosReducer(estadoInicial, action);

    expect(resultado).toHaveLength(3);
    expect(resultado[2]).toEqual(nuevoLibro);
    expect(resultado).toContainEqual(nuevoLibro);
  });

  test('actualizar un libro', () => {
    const libroActualizado = {
      id: '1',
      nombre: 'El Resplandor - Edición Especial',
      descripcion: 'Novela de terror de Stephen King - Versión extendida',
      fechaIngreso: '2024-01-15',
      genero: 'Terror'
    };

    const action = {
      type: 'actualizar',
      libro: libroActualizado
    };

    const resultado = librosReducer(estadoInicial, action);

    expect(resultado).toHaveLength(2);
    expect(resultado[0].nombre).toBe('El Resplandor - Edición Especial');
    expect(resultado[0].descripcion).toBe('Novela de terror de Stephen King - Versión extendida');
    expect(resultado[0].id).toBe('1'); 
    expect(resultado[1]).toEqual(estadoInicial[1]); 
  });

  test('eliminar un libro', () => {
    const action = {
      type: 'eliminar',
      libro: { id: '1' }
    };

    const resultado = librosReducer(estadoInicial, action);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('2');
    expect(resultado).not.toContainEqual(estadoInicial[0]);
    expect(resultado.find(libro => libro.id === '1')).toBeUndefined();
  });

  test('lanzar error con acción no contemplada', () => {
    const action = {
      type: 'accion_invalida',
      libro: {}
    };

    expect(() => {
      librosReducer(estadoInicial, action);
    }).toThrow('Esta acción no esta contemplada');
  });
});
