"use client"

//Esta interfaz se puede modificar y se tiene que enviar! 
import { useMemo, useState } from "react";
import { Movimiento } from "../index";
import { DatosMovimientos } from "../datosMovimientos"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    clase: string,
    filasPorPagina: number
}

export const GrillaParametrizableOld = ({ clase, filasPorPagina }: Props) => {

    const [pagina, setPagina] = useState(1);
    const paginasTotales = Math.ceil(DatosMovimientos.movimientos.length / filasPorPagina);

    function paginaAnterior() {
        if (pagina > 1) setPagina(pagina - 1)
    }

    function paginaSiguiente() {
        if (pagina < paginasTotales) setPagina(pagina + 1)
    }

    const registrosPorPagina = useMemo(() => {
        const registros = DatosMovimientos.movimientos.filter((movimiento) => (
            DatosMovimientos.movimientos.indexOf(movimiento) >= (filasPorPagina * (pagina - 1))) && (DatosMovimientos.movimientos.indexOf(movimiento) < (filasPorPagina * pagina)));
        return registros;
    }, [filasPorPagina, pagina]);

    function leerRegistro(fila: typeof DatosMovimientos.movimientos[0], columna: Object) {
        var registro = " ";
        if (typeof fila === typeof Date) {
            registro = new Date(columna.toString()).toLocaleDateString();
        } else {
            registro = fila[columna.toString() as keyof Movimiento].toString();
        }
        return registro;
    };

    return (
        <table className=" bg-white rounded-lg shadow-lg w-auto text-sm">
            <thead>
                <tr className="grid grid-cols-10 bg-slate-100 text-slate-500 text-sm rounded-xl">
                    {Object.keys(DatosMovimientos.movimientos[0]).map((columna) => (
                        <th 
                            key={columna}
                            className="p-2 text-left"
                        >
                            {columna.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="grid grid-rows-4 border-b-2 text-slate-700">
                {registrosPorPagina.map((fila) => (
                    <tr
                        className="grid grid-cols-10"
                        key={DatosMovimientos.movimientos.indexOf(fila)}
                    >
                        {Object.keys(DatosMovimientos.movimientos[0]).map((columna) => (
                            <td
                                key={columna}
                                className="p-2 text-justify align-center"
                            >
                                {leerRegistro(fila, columna)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot className="flex justify-center p-3 text-slate-700">
                <button className={`${pagina === 1 ? "text-transparent" : "bg-slate-100 text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaAnterior}>
                    <ChevronLeft />
                </button>
                <span className="p-1">
                    {pagina.toString()}
                </span>
                <button className={`${pagina === paginasTotales ? "text-transparent" : "bg-slate-100 text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaSiguiente}>
                    <ChevronRight />
                </button>
            </tfoot>
        </table>
    );
};