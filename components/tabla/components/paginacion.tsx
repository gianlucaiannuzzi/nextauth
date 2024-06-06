"use client"

//Esta interfaz se puede modificar y se tiene que enviar! 
import { useMemo, useState } from "react";
import { DatosTabla } from "../datos";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    paginasTotales: number
}

const Paginacion = () => {

    const [pagina, setPagina] = useState(1);
    const paginasTotales = Math.ceil(DatosTabla.body.length / DatosTabla.filasPorPagina);

    const registrosPorPagina = useMemo(() => {
        const registros = DatosTabla.body.filter((valor) => ((valor.key > (DatosTabla.filasPorPagina * (pagina - 1))) && (valor.key < (DatosTabla.filasPorPagina * pagina))));
        return registros;
    }, [pagina]);

    function paginaAnterior() {
        if (pagina > 1) setPagina(pagina - 1)
    }

    function paginaSiguiente() {
        if (pagina < paginasTotales) setPagina(pagina + 1)
    }

    return (
        <>
            <tbody className="flex flex-col m-2 p-3 border-b-2">
                {registrosPorPagina.map((fila) => (
                    <tr
                        className="flex flex-row justify-between py-3"
                        key={fila.key}
                    >
                        {fila.filas.map((valor) => (
                            <td
                                key={valor.texto}
                            >
                                {valor.texto}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot className="flex flex-row justify-center p-2">
                <button className={`${pagina === 1 ? "text-transparent" : ""}`} onClick={paginaAnterior}>
                    <ChevronLeft />
                </button>
                <span className="bg-gray p-2">
                    {pagina.toString()}
                </span>
                <button className={`${pagina === paginasTotales ? "text-transparent" : ""}`} onClick={paginaSiguiente}>
                    <ChevronRight />
                </button>
            </tfoot>
        </>
    );
};

export default Paginacion;
