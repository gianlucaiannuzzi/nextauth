// ! Este componente se ejecuta del lado del cliente.
"use client"
import { useState } from "react";
import { GrillaProps } from '../interfaces/interfaces'
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

export const GrillaParametrizable = ({ header, actions, body, clase, filasPorPagina }: GrillaProps) => {

    // ? Valores necesarios para pasar a los distintos componentes de la grilla.
    const columnasTotales = clase === "ABM" ? header.length + 1 : header.length;
    const [paginasTotales, setPaginasTotales] = useState(filasPorPagina > 0 ? Math.ceil(body.length / filasPorPagina) : 1);

    // ? Funcion que se encarga de las paginas totales que pueden variar por la busqueda de Strings.
    const handlePaginasTotales = (filasTotales: number) => {
        setPaginasTotales(filasPorPagina > 0 ? Math.ceil(filasTotales / filasPorPagina) : 1);
    };

    return (
        <div className="p-3 bg-white w-full h-full">
            <table className=" bg-white rounded-lg shadow-lg text-xs p-1" >
                <GrillaHead header={header} clase={clase} columnasTotales={columnasTotales} />
                <GrillaBody actions={actions} body={body} clase={clase} filasPorPagina={filasPorPagina} columnasTotales={columnasTotales} handlePaginasTotales={handlePaginasTotales} />
                <GrillaFoot actions={actions} clase={clase} paginasTotales={paginasTotales} />
            </table>
        </div>
    );
};