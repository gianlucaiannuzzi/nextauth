// ! Este componente se ejecuta del lado del cliente.
"use client"
import { ArrowDownAZ, ArrowUpAZ, TextSearch } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


// ? Los parametros necesarios para crear la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? columnasTotales: cantidad de columnas dependiendo de la clase ingresada.
interface Props {
    header: string[],
    clase: string
    columnasTotales: number
}

const GrillaHead = ({ header, clase }: Props) => {

    // ? Valores necesarios para cambiar valores pasados por URL al header y al body.
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const columnasTotales = clase === "ABM" ? header.length + 2 : header.length;

    // ? Funcion que se encarga del ordenamiento por columnas.
    const handleOrder = (orden: number) => {
        const params = new URLSearchParams(searchParams);
        if (orden.toString() === params.get('orderColumn') && params.get('orderDirection') === 'desc') {
            params.set('orderDirection', 'asc');
        } else {
            params.set('orderDirection', 'desc');
        }
        params.set('orderColumn', orden.toString());
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    };

    // ? Funcion que se encarga de la busqueda de Strings por columnas.
    const handleSearchColumn = (ordenColumna: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('searchColumn', ordenColumna.toString());
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    };

    return (
        <thead>
            <tr className={`grid grid-cols-${columnasTotales} align-middle bg-slate-100 rounded-lg shadow-lg text-slate-500`} >
                {header.map((columna) => (
                    <th
                        key={columna}
                        className="flex justify-center items-center p-2 border-r-2"
                    >
                        <span>
                            {columna.toUpperCase()}
                        </span>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => handleOrder(header.indexOf(columna))}
                                className="hover:text-slate-300 p-2"
                            >
                                {(searchParams.get('orderDirection') === 'asc' || searchParams.get('orderColumn') != header.indexOf(columna).toString()) && (
                                    <ArrowUpAZ
                                        size={16}
                                        className={`${searchParams.get('orderColumn') === header.indexOf(columna).toString() ? 'text-blue-500' : ''}`}
                                    />
                                )}
                                {searchParams.get('orderDirection') === 'desc' && searchParams.get('orderColumn') === header.indexOf(columna).toString() && (
                                    <ArrowDownAZ
                                        size={16}
                                        className={`${searchParams.get('orderColumn') === header.indexOf(columna).toString() ? 'text-blue-500' : ''}`}
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => handleSearchColumn(header.indexOf(columna))}
                                className="hover:text-slate-300"
                            >
                                <TextSearch
                                    size={16}
                                    className={`${searchParams.get('searchColumn') === header.indexOf(columna).toString() ? 'text-blue-500' : ''}`}
                                />
                            </button>
                        </div>
                    </th>
                ))}
                {clase === "ABM" && (
                    <th className="flex justify-center items-center p-2 border-r-2">
                        MODIFICAR
                    </th>
                )}
                {clase === "ABM" && (
                    <th className="flex justify-center items-center p-2">
                        ELIMINAR
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default GrillaHead;