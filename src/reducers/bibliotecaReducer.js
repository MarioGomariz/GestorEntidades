export function bibliotecaReducer(biblioteca, action) {

    switch(action.type) {
        case "agregar" : return [...biblioteca, action.biblioteca];
        case "actualizar" : return biblioteca.map(biblioteca => {
            if(biblioteca.id === action.biblioteca.id) {
                return {
                    ...action.biblioteca,
                    id: biblioteca.id
                };
            }
            return biblioteca;
        });
        case "eliminar" : return biblioteca.filter(biblioteca => biblioteca.id !== action.biblioteca.id);
        default : throw Error("Esta acción no esta contemplada");
    }
}
