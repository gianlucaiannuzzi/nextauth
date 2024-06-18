import { LucideIcon } from "lucide-react";

// ? Los botones y funciones que van a operar en la grilla.
// ? icono: icono de Lucide que servira como boton.
// ? modificaRegistro: si el proceso afectara a la grilla completa o si es individual para cada registro.
// ? style: estilo personalizable que tomara el icono.
// ? funcion: funcion que se ejecutara al pulsar el boton.
interface Action {
    icono: React.ElementType,
    modificaRegistro: boolean,
    style: string,
    funcion: (...args: any[]) => void
}

// ? Los parametros necesarios para crear la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
// ? actions: JSON con la lista de las acciones, sus iconos y funciones asociadas.
// ? body: JSON con la lista de los valores de la grilla. Todos los elementos deben tener la misma columna y tipo, como un response.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? filasPorPagina: cantidad de filas por pagina. Si se ingresa 0, no se usara paginacion.
// ! Agregar al tailwind.config la safelist personalizada.
export interface GrillaProps {
    header: string[],
    actions: Action[],
    body: Record<string, string | number>[],
    clase: string,
    filasPorPagina: number,
}

// ? Los parametros necesarios para crear el header de la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? columnasTotales: cantidad de columnas dependiendo de la clase ingresada.
export interface HeadProps {
    header: string[],
    clase: string,
    columnasTotales: number
}

// ? Los parametros necesarios para crear las utilidades de la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
export interface UtilidadesProps {
    header: string[]
}

// ? Los parametros necesarios para crear la grilla.
// ? actions: JSON con la lista de las acciones, sus iconos y funciones asociadas.
// ? body: JSON con la lista de los valores de la grilla. Todos los elementos deben tener la misma columna y tipo, como un response.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? handlePaginasTotales: funcion que se encarga de cambiar las paginas totales para que luego las use la paginacion en el footer.
// ? filasPorPagina: cantidad de filas que se desea si se aplica la paginacion. Si se ingresa 0 no se aplica paginacion.
// ? columnasTotales: cantidad de columnas dependiendo de la clase ingresada.
export interface BodyProps {
    actions: Action[],
    body: Record<string, any>[],
    clase: string,
    handlePaginasTotales: Function,
    filasPorPagina: number,
    columnasTotales: number
}

// ? Los parametros necesarios para crear el footer de la grilla.
// ? actions: JSON con la lista de las acciones, sus iconos y funciones asociadas.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? filasPorPagina: cantidad de filas que se desea si se aplica la paginacion. Si se ingresa 0 no se aplica paginacion.
// ? paginasTotales: cantidad de paginas totales. Puede variar al realizar una busqueda.
export interface FootProps {
    actions: Action[],
    clase: string,
    paginasTotales: number
}

// ? Los parametros necesarios para crear la paginacion de la grilla.
// ? arregloPaginas: arreglo con el numero de cada pagina como elemento.
export interface PaginacionProps {
    arregloPaginas: number[]
}
