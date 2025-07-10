export function librosReducer(libros, action) {

    switch(action.type) {
        case "agregar" : return [...libros, action.libro];
        case "actualizar" : return libros.map(libro => {
            if(libro.id === action.libro.id) {
                return {
                    ...action.libro,
                    id: libro.id
                };
            }
            return libro;
        })
        case "eliminar" : return libros.filter(libro => libro.id !== action.libro.id);
        default : throw Error("Esta acción no esta contemplada");
    }
}
