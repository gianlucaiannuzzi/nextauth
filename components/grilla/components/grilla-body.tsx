// ! Este componente se ejecuta del lado del cliente.
"use client"
import { useEffect, useMemo, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";

// ? Los parametros necesarios para crear la grilla.
// ? body: JSON con la lista de los valores de la grilla. Todos los elementos deben tener la misma columna y tipo, como un response.
// ? paginacion: si se va a aplicar paginacion o no, puede ser true o false.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? handlePaginasTotales: funcion que se encarga de cambiar las paginas totales para que luego las use la paginacion en el footer.
// ? filasPorPagina: cantidad de filas que se desea si se aplica la paginacion.
// ? columnasTotales: cantidad de columnas dependiendo de la clase ingresada.
interface Props {
    body: Record<string, any>[],
    paginacion: boolean, 
    clase: string,
    handlePaginasTotales: Function,
    filasPorPagina: number,
    columnasTotales: number
}

const GrillaBody = ({ body, paginacion, clase, handlePaginasTotales, filasPorPagina, columnasTotales }: Props) => {

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
        if(ordenColumna > -1) {
            registros = (registros.sort((a, b) => {
                if(a[Object.keys(registros[0])[ordenColumna]] > b[Object.keys(registros[0])[ordenColumna]]) {
                    return (ordenDireccion === 'desc' ? 1 : -1);
                } else {
                    return (ordenDireccion === 'desc' ? -1 : +1);
                }
            }));
        };

        // ? Busqueda de Strings a partir de la cadena insertada en el footer.
        if(busquedaColumna > -1) {
            registros = (registros.filter((registro) => (
                String(registro[Object.keys(registro)[busquedaColumna]])).toLowerCase().includes(busquedaTexto.toLowerCase())));
        };

        // ? Si se indica por parametro, se puede deshabilitar la paginacion.
        if(paginacion) {
            setRegistrosPaginacion(registros);
            registros = (registros.filter((registro) => (
                registros.indexOf(registro) >= (filasPorPagina * (paginaActual - 1))) && (registros.indexOf(registro) < (filasPorPagina * paginaActual))));
        }
        
        return registros;

    }, [body, busquedaColumna, busquedaTexto, filasPorPagina, ordenColumna, ordenDireccion, paginaActual, paginacion]);

    // TODO Funcion que modifique un registro de la grilla.
    const handleEdit = (registro: Record<string, any>) => {
        
    };

    // TODO Funcion que borre un registro de la grilla.
    const handleDelete = (registro: Record<string, any>) => {
        
    };


    // ? Esta funcion se encarga de leer el registro a partir de cierta fila y columna.
    function leerRegistro(fila: typeof body[0], columna: Object) {
        return fila[columna.toString()].toString();
    };

    return (
        <tbody className={`grid grid-rows-${filasPorPagina} border-b-2 text-slate-700`} >
            {registrosPorPagina.map((fila) => (
                <tr
                    className={`grid grid-cols-${columnasTotales}  mt-2 border-b-2 border-slate-100`}
                    key={body.indexOf(fila)}
                >
                    {Object.keys(body[0]).map((columna) => (
                        <td
                            key={columna}
                            className="p-2 text-justify align-center"
                        >
                            {leerRegistro(fila, columna)}
                        </td>
                    ))}
                    {clase === "ABM" && (
                        <td className="flex justify-center p-2 text-slate-700 hover:text-slate-300">
                            <button onClick={() => handleEdit(fila)}>
                                <Pencil size={18} />
                            </button>
                        </td>
                    )}
                    {clase === "ABM" && (
                        <td className="flex justify-center p-2 text-red-500 hover:text-red-300">
                            <button onClick={() => handleDelete(fila)}>
                                <Trash2 size={18} />
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default GrillaBody;