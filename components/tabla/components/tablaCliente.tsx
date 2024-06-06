"use client"

//Esta interfaz se puede modificar y se tiene que enviar! 
import { useMemo, useState } from "react";
import { DatosTabla} from "../datos";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TablaClienteParametrizable = () => {

    const [pagina, setPagina] = useState(1);
    const paginasTotales = Math.ceil(DatosTabla.body.length / DatosTabla.filasPorPagina);
    
    function paginaAnterior () {
        if(pagina > 1) setPagina(pagina - 1)
    }

    function paginaSiguiente () {
        if(pagina < paginasTotales) setPagina(pagina + 1)
    }

    const registrosPorPagina = useMemo(() => {
        const registros = DatosTabla.body.filter((valor) => ((valor.key > (DatosTabla.filasPorPagina * (pagina - 1))) && (valor.key < (DatosTabla.filasPorPagina * pagina))));
        return registros;
    }, [pagina]);

    return (
        <div className="m-2 p-3 bg-white rounded-lg shadow-lg border-1">
            <div className="bg-slate-100 flex flex-row font-semibold justify-between p-3 rounded-xl">
                {DatosTabla.header.map((columna) => (
                    <div
                        className="px-2"
                        key={columna.texto}
                    >
                        { columna.texto }
                    </div>
                ))}
            </div>
            <div className="flex flex-col p-3 border-b-2">
                {registrosPorPagina.map((fila) => (
                    <div
                        className="flex flex-row justify-between py-3"
                        key={fila.key}
                    >
                            {fila.filas.map((valor) => (
                        <div
                            key={valor.texto}
                        >
                            { valor.texto }
                        </div>
                        ))}
                    </div>    
                ))}
            </div>
            <div className="flex flex-row justify-center p-2">
                <button className={`${pagina === 1 ? "text-transparent" : ""}`} onClick={paginaAnterior}>
                    <ChevronLeft />
                </button>
                <span className="bg-gray p-2">
                    { pagina.toString() }
                </span>
                <button className={`${pagina === paginasTotales ? "text-transparent" : ""}`} onClick={paginaSiguiente}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    );

};

export default TablaClienteParametrizable;
