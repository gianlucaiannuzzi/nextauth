// ! Este componente se ejecuta del lado del cliente.
"use client"
import { ChevronLeft, ChevronRight, CircleFadingPlus } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// ? Los parametros necesarios para crear la grilla.
// ? header: array con la misma cantidad de columnas del JSON, que dara el titulo de cada columna.
// ? body: JSON con la lista de los valores de la grilla. Todos los elementos deben tener la misma columna y tipo, como un response.
// ? paginacion: si se va a aplicar paginacion o no, puede ser true o false.
// ? clase: si la grilla sera solo de consulta ("C") o para modificacion ("ABM").
// ? filasPorPagina: cantidad de filas que se desea si se aplica la paginacion.
interface Props {
    paginacion: boolean,
    clase: string,
    paginasTotales: number
}

const GrillaFoot = ({ paginacion, clase, paginasTotales }: Props) => {

    // ? Valores necesarios para realizar la paginacion.
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const pagina = Number(searchParams.get('currentPage')) || 1;

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

    // ? Funcion que se encarga de la paginacion.
    const handlePage = (pagina: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('currentPage', pagina.toString());
        replace(`${pathname}?${params.toString()}`)
    };

    // TODO Funcion que añada un registro a la grilla.
    const handleAdd = () => {

    };

    function paginaAnterior() {
        if (pagina > 1) handlePage(pagina - 1);
    }

    function paginaSiguiente() {
        if (pagina < paginasTotales) handlePage(pagina + 1);
    }

    return (
        <tfoot>
            <tr className="grid grid-cols-3 m-2 text-slate-700">
                <td>
                    <input
                        id={"busqueda"}
                        defaultValue={searchParams.get('searchString')?.toString()}
                        onChange={(event) => handleSearch(event.target.value)}
                        placeholder="Buscar..."
                        className="flex justify-start bg-slate-100 p-2 rounded-lg shadow-lg"
                    />
                </td>
                {paginacion && (
                    <td className="flex justify-center">
                        <button className={`${pagina === 1 ? "text-transparent" : "bg-slate-100 text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaAnterior}>
                            <ChevronLeft />
                        </button>
                        <span className="text-xl p-1">
                            {pagina.toString()}
                        </span>
                        <button className={`${pagina === paginasTotales ? "text-transparent" : "bg-slate-100 text-slate-500 rounded-xl"} mx-2 p-1`} onClick={paginaSiguiente}>
                            <ChevronRight />
                        </button>
                    </td>
                )}
                <td className="flex justify-end">
                    {clase === "ABM" && (
                        <button
                            onClick={() => handleAdd()}
                            className="flex align-baseline font-semibold bg-slate-100 p-2 text-slate-700 hover:text-slate-300 rounded-lg shadow-lg"
                        >
                            <CircleFadingPlus size={18} />
                            <span className="ml-2">Agregar Registro</span>
                        </button>
                    )}
                </td>
            </tr>
        </tfoot>
    );
};

export default GrillaFoot;