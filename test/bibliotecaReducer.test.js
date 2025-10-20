import { bibliotecaReducer } from '../src/reducers/bibliotecaReducer';

describe('bibliotecaReducer - Pruebas Unitarias', () => {
  
  
  const estadoInicial = [
    {
      id: '1',
      nombre: 'Biblioteca Central',
      direccion: 'Calle 111',
    },
    {
      id: '2',
      nombre: 'Biblioteca de la Universidad',
      direccion: 'Calle 222',
    }
  ];

  test('agregar una nueva biblioteca ', () => {
    const nuevaBiblioteca = {
      id: '3',
      nombre: 'Biblioteca de la Escuela',
      direccion: 'Calle 333',
    };

    const action = {
      type: 'agregar',
      biblioteca: nuevaBiblioteca
    };

    const resultado = bibliotecaReducer(estadoInicial, action);

    expect(resultado).toHaveLength(3);
    expect(resultado[2]).toEqual(nuevaBiblioteca);
    expect(resultado).toContainEqual(nuevaBiblioteca);
  });

  test('actualizar una biblioteca', () => {
    const bibliotecaActualizada = {
      id: '1',
      nombre: 'Biblioteca Central',
      direccion: 'Calle 123',
    };

    const action = {
      type: 'actualizar',
      biblioteca: bibliotecaActualizada
    };

    const resultado = bibliotecaReducer(estadoInicial, action);

    expect(resultado).toHaveLength(2);
    expect(resultado[0].nombre).toBe('Biblioteca Central');
    expect(resultado[0].direccion).toBe('Calle 123');
    expect(resultado[0].id).toBe('1'); 
    expect(resultado[1]).toEqual(estadoInicial[1]); 
  });

  test('eliminar una biblioteca', () => {
    const action = {
      type: 'eliminar',
      biblioteca: { id: '1' }
    };

    const resultado = bibliotecaReducer(estadoInicial, action);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('2');
    expect(resultado).not.toContainEqual(estadoInicial[0]);
    expect(resultado.find(biblioteca => biblioteca.id === '1')).toBeUndefined();
  });

  test('lanzar error con acción no contemplada', () => {
    const action = {
      type: 'accion_invalida',
      biblioteca: {}
    };

    expect(() => {
      bibliotecaReducer(estadoInicial, action);
    }).toThrow('Esta acción no esta contemplada');
  });
});
