// ! Este componente se ejecuta del lado del cliente.
"use client"
import { FootProps, PaginacionProps } from '../interfaces/interfaces'
import { ChevronLeft, ChevronRight, CircleFadingPlus } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const GrillaFoot = ({ actions, clase, paginasTotales }: FootProps) => {

    return (
        <tfoot className="flex flex-col mt-2">
            <tr className=" text-slate-700">
                <td className="flex justify-end mx-2">
                    {actions.map((accion) => (!accion.modificaRegistro &&
                        <button
                            key={actions.indexOf(accion)}
                            className={`px-3 rounded-lg ${accion.style}`}
                            onClick={() => accion.funcion()}
                        >
                            <accion.icono size={18} />
                        </button>
                    ))}
                </td>
            </tr>
            <GrillaPaginacion arregloPaginas={Array.from({ length: paginasTotales }, (_, i) => i + 1)} />
        </tfoot>
    );
};

const GrillaPaginacion = ({ arregloPaginas }: PaginacionProps) => {

    // ? Valores necesarios para realizar la paginacion.
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const pagina = Number(searchParams.get('currentPage')) || 1;

    // ? Funcion que se encarga de cambiar la pagina por URL.
    const handlePage = (pagina: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('currentPage', pagina.toString());
        replace(`${pathname}?${params.toString()}`)
    };

    // ? Se toma como valor por defecto para la pagina actual el valor 1.
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('currentPage', pagina.toString());
        replace(`${pathname}?${params.toString()}`)
    });

    // ? Funcion que se encarga de generar la paginacion dinamica de la grilla.
    // ? paginas: arreglo con cada pagina como elemento.
    // ? paginaActual: valor actual de la pagina.
    const generarPaginacion = (paginas: number[], paginaActual: number) => {

        // ? Si la cantidad de paginas es menor o igual a 5 la paginacion sera estatica.
        if (paginas.length <= 5) {
            return (
                paginas.map((paginaEnumerada) => (
                    <button
                        onClick={() => handlePage(paginaEnumerada)}
                        key={paginaEnumerada}
                        className={`${paginaEnumerada === pagina ? 'bg-blue-500 text-white px-3 rounded-lg' : ''} text-sm px-2 py-1`}
                    >
                        {paginaEnumerada.toString()}
                    </button>
                ))
            );

            // ? Caso contrario la paginacion se renderizara dinamicamente.   
        } else {

            // ? Se crea un arreglo vacio que se llenara con las paginas correspondientes a cada caso.
            // ? Para rellenar con '...' se utilizara la pagina -1.
            const nuevoArreglo: number[] = [];
            if (paginaActual > 3 && paginaActual < (paginas.length - 2)) {
                nuevoArreglo.push(1, -1, paginaActual - 1, paginaActual, paginaActual + 1, -1, paginas[paginas.length - 1])
            } else if (paginaActual > 3) {
                nuevoArreglo.push(1, -1, paginaActual - 1, ...paginas.filter((pag) => paginas.indexOf(pag) > paginaActual - 2))
            } else {
                nuevoArreglo.push(...paginas.filter((pag) => paginas.indexOf(pag) < paginaActual + 1), -1, paginas[paginas.length - 1])
            };

            return (
                nuevoArreglo.map((paginaEnumerada) => (
                    <div
                        key={nuevoArreglo.indexOf(paginaEnumerada)}
                    >
                        {paginaEnumerada === -1 &&
                            <span
                                className="text-sm px-2 py-1"
                            >
                                ...
                            </span>
                        }
                        {paginaEnumerada !== -1 &&
                            <button
                                onClick={() => handlePage(paginaEnumerada)}
                                className={`${paginaEnumerada === paginaActual ? 'bg-blue-500 text-white px-3 rounded-lg' : ''} text-sm px-2 py-1`}
                            >
                                {paginaEnumerada.toString()}
                            </button>
                        }
                    </div>
                ))
            );
        };
    };

    // ? Funcion que se encarga del boton de pagina anterior.
    function paginaAnterior() {
        if (pagina > 1) handlePage(pagina - 1);
    }

    // ? Funcion que se encarga del boton de pagina siguiente.
    function paginaSiguiente() {
        if (pagina < arregloPaginas[arregloPaginas.length - 1]) handlePage(pagina + 1);
    }

    return (
        <tr className="pb-4 text-slate-700">
            <td className="flex justify-center">
                <button className={`${pagina === 1 ? "text-slate-200 cursor-not-allowed" : " text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaAnterior}>
                    <ChevronLeft size={14} />
                </button>
                {generarPaginacion(arregloPaginas, pagina)}
                <button className={`${pagina === arregloPaginas[arregloPaginas.length - 1] ? "text-slate-200 cursor-not-allowed" : " text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaSiguiente}>
                    <ChevronRight size={14} />
                </button>
            </td>
        </tr>
    );
};

export default GrillaFoot;