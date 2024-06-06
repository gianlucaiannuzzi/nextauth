// ! Este componente se ejecuta del lado del cliente.
"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
const GrillaHead = dynamic(() => import("./grilla-head"), {
    ssr: false,
});
const GrillaBody = dynamic(() => import("./grilla-body"), {
    ssr: false,
});
const GrillaFoot= dynamic(() => import("./grilla-foot"), {
    ssr: false,
});

// ? Los parametros necesarios para crear la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
// ? body: JSON con la lista de los valores de la grilla. Todos los elementos deben tener la misma columna y tipo, como un response.
// ? paginacion: si se va a aplicar paginacion o no, puede ser true o false.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? filasPorPagina: cantidad de filas que se desea si se aplica la paginacion.
// ! Agregar al tailwind.config la safelist personalizada.
interface Props {
    header: string[],
    body: Record<string, any>[],
    paginacion: boolean,
    clase: string,
    filasPorPagina?: number,
}

export const GrillaParametrizable = ({ header, body, paginacion, clase, filasPorPagina }: Props) => {

    // ? Valores necesarios para pasar a los distintos componentes de la grilla.
    filasPorPagina = filasPorPagina || 1;
    const columnasTotales = clase === "ABM" ? header.length + 2 : header.length;
    const [paginasTotales, setPaginasTotales] = useState(paginacion ? Math.ceil(body.length / filasPorPagina) : 1);

    // ? Funcion que se encarga de las paginas totales que pueden variar por la busqueda de Strings.
    const handlePaginasTotales = (filasTotales: number) => {
        setPaginasTotales(paginacion ? Math.ceil(filasTotales / filasPorPagina) : 1);
    };

    return (
        <div className="p-3 bg-white w-full h-full">
            <table className=" bg-white rounded-lg shadow-lg text-xs" >
                <GrillaHead header={header} clase={clase} columnasTotales={columnasTotales} />
                <GrillaBody body={body} paginacion={paginacion} clase={clase} filasPorPagina={filasPorPagina} columnasTotales={columnasTotales} handlePaginasTotales={handlePaginasTotales} />
                <GrillaFoot paginacion={paginacion} clase={clase} paginasTotales={paginasTotales} />
            </table>
        </div>
    );
};