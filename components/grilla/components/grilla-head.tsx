// ! Este componente se ejecuta del lado del cliente.
"use client"
import { HeadProps, UtilidadesProps } from '../interfaces/interfaces'
import { Combobox } from "@/components/combo";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const GrillaHead = ({ header, clase, columnasTotales }: HeadProps) => {

    return (
        <thead className="flex flex-col space-y-1">
            <GrillaUtilidades header={header} />
            <tr className={`grid grid-cols-${columnasTotales} align-middle border-b-4 border-blue-500 text-slate-500`} >
                {header.map((columna) => (
                    <th
                        key={columna}
                        className="flex justify-center items-center p-2"
                    >
                        <span>
                            {columna.toUpperCase()}
                        </span>
                    </th>
                ))}
                {clase === "ABM" && (
                    <th className="flex justify-center items-center p-2">
                        ACCIONES
                    </th>
                )}
            </tr>
        </thead>
    );
};

const GrillaUtilidades = ({ header }: UtilidadesProps) => {

    // ? Valores necesarios para cambiar valores pasados por URL al header y al body.
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // ? Se usa como valor por defecto la direccion del ordenamiento como descendente.
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('orderDirection', 'desc');
        replace(`${pathname}?${params.toString()}`)
    });

    // ? Funcion que se encarga de la columana seleccionada para el ordenamiento por columnas.
    const handleOrderColumn = (ordenColumna: number) => {
        const params = new URLSearchParams(searchParams);
        if (ordenColumna > -1) {
            params.set('orderColumn', ordenColumna.toString());
        } else {
            params.delete('orderColumn');
        }
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    };

    // ? Funcion que se encarga de la direccion del ordenamiento por columnas.
    const handleOrderDirection = () => {
        const params = new URLSearchParams(searchParams);
        if (params.get('orderDirection') === 'desc') {
            params.set('orderDirection', 'asc');
        } else {
            params.set('orderDirection', 'desc');
        }
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    }

    // ? Funcion que se encarga de la busqueda de Strings por columnas.
    const handleSearchColumn = (busquedaColumna: number) => {
        const params = new URLSearchParams(searchParams);
        if (busquedaColumna > -1) {
            params.set('searchColumn', busquedaColumna.toString());
        } else {
            params.delete('searchColumn');
        }
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    };

    // ? Funcion que se encarga de la busqueda de Strings por columnas.
    // ? Se usa un debounce para no sobrecargar de peticiones al tipear cada letra.
    const handleSearch = useDebouncedCallback((busqueda: string) => {
        const params = new URLSearchParams(searchParams);
        if (busqueda) {
            params.set('searchString', busqueda);
        } else {
            params.delete('searchString');
        }
        params.set('currentPage', '1');
        replace(`${pathname}?${params.toString()}`)
    }, 300);

    return (
        <tr className="flex justify-between m-2 text-slate-500" >
            <td className="flex flex-row items-center">
                <div className="flex absolute items-center pl-2">
                    <Search size={16} />
                </div>
                <input
                    id={"busqueda"}
                    type="text"
                    defaultValue={searchParams.get('searchString')?.toString()}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder="Ingrese una busqueda..."
                    className="bg-gray-50 border border-gray-300 text-slate-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 p-1"
                />
            </td>
            <td className="flex flex-row items-center text-sm">
                <div className="mx-2">
                    <span>Busqueda por: </span>
                    <Combobox opciones={header} onChange={handleSearchColumn} placeholder={""} selectedValue={Number(searchParams.get('searchColumn')) || -1} />
                </div>
                <div className="mx-2">
                    <span>Ordenar por: </span>
                    <Combobox opciones={header} onChange={handleOrderColumn} placeholder={""} selectedValue={Number(searchParams.get('orderColumn')) || -1} />
                </div>
                <button
                    onClick={() => handleOrderDirection()}
                    className="hover:text-slate-300 p-2"
                >
                    {searchParams.get('orderDirection') === 'desc' && (
                        <ArrowDownWideNarrow
                            size={16}
                        />
                    )}
                    {searchParams.get('orderDirection') !== 'desc' && (
                        <ArrowDownNarrowWide
                            size={16}
                        />
                    )}
                </button>
            </td>
        </tr>
    );
};

export default GrillaHead;