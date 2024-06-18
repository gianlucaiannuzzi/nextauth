// ! Este componente se ejecuta del lado del cliente.
"use client"
import { BodyProps } from '../interfaces/interfaces'
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrillaBody = ({ actions, body, clase, handlePaginasTotales, filasPorPagina, columnasTotales }: BodyProps) => {

    // ? Valores necesarios que se pasan por URL para el funcionamiento de la grilla.
    const searchParams = useSearchParams();
    const paginaActual = Number(searchParams.get('currentPage')) || 1;
    const ordenColumna = Number(searchParams.get('orderColumn')) || -1;
    const ordenDireccion = searchParams.get('orderDirection') || 'desc';
    const busquedaTexto = searchParams.get('searchString') || "";
    const busquedaColumna = Number(searchParams.get('searchColumn')) || -1;
    const [registrosPaginacion, setRegistrosPaginacion] = useState(body);

    // ? Funcion que se encarga de actualizar las filas totales para cargar la paginacion correctamente.
    useEffect(() => {
        handlePaginasTotales(registrosPaginacion.length);
    }, [handlePaginasTotales, registrosPaginacion.length]);

    // ? Funcion que se encarga de volver a renderizar los valores de la grilla en caso de ordenamiento, busqueda o cambio de pagina (Si hay paginacion).
    const registrosPorPagina = useMemo(() => {
        var registros = body;

        // ? Ordenamiento descendente/ascendente por columna seleccionada.
        if (ordenColumna > -1) {
            registros = (registros.sort((a, b) => {
                if (a[Object.keys(registros[0])[ordenColumna]] > b[Object.keys(registros[0])[ordenColumna]]) {
                    return (ordenDireccion === 'desc' ? 1 : -1);
                } else {
                    return (ordenDireccion === 'desc' ? -1 : +1);
                }
            }));
        };

        // ? Busqueda de Strings a partir de la cadena insertada en el footer.
        if (busquedaColumna > -1) {
            registros = (registros.filter((registro) => (
                String(registro[Object.keys(registro)[busquedaColumna]])).toLowerCase().includes(busquedaTexto.toLowerCase())));
        };

        // ? Si el numero de filas por pagina ingresado es 0, se llevara a cabo la paginacion.
        // ? Al cambiar registrosPaginacion se actualizan las paginas totales del resto de los componentes.
        if (filasPorPagina > 0) {
            setRegistrosPaginacion(registros);
            registros = (registros.filter((registro) => (
                registros.indexOf(registro) >= (filasPorPagina * (paginaActual - 1))) && (registros.indexOf(registro) < (filasPorPagina * paginaActual))));
        }

        return registros;

    }, [body, busquedaColumna, busquedaTexto, filasPorPagina, ordenColumna, ordenDireccion, paginaActual]);

    // ? Esta funcion se encarga de leer el registro a partir de cierta fila y columna.
    function leerRegistro(fila: typeof body[0], columna: Object) {
        return fila[columna.toString()];
    };

    return (
        <tbody className={`grid grid-rows-${filasPorPagina > 0 ? filasPorPagina : registrosPorPagina.length} border-b-2 border-slate-300 text-slate-700`} >
            {registrosPorPagina.map((fila) => (
                <tr
                    className={`grid grid-cols-${columnasTotales}  mt-2 border-b-2 border-slate-100`}
                    key={body.indexOf(fila)}
                >
                    {Object.keys(body[0]).map((columna) => (
                        <td
                            key={columna}
                            className={`p-2 align-center ${typeof leerRegistro(fila, columna) === typeof Number ? 'text-right' : 'text-left'}`}
                        >
                            {leerRegistro(fila, columna)}
                        </td>
                    ))}
                    {clase === "ABM" && (
                        <>
                            <td className="flex justify-center gap-1">
                                {actions.map((accion) => (accion.modificaRegistro &&
                                    <button
                                        key={actions.indexOf(accion)}
                                        className={`px-3 rounded-lg ${accion.style}`}
                                        onClick={() => accion.funcion(fila)}
                                    >
                                        <accion.icono size={16} />
                                    </button>
                                ))}
                            </td>
                        </>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default GrillaBody;