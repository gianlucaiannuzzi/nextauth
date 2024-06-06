//Esta interfaz se puede modificar y se tiene que enviar! 
import { DatosTabla } from "../datos";
import Paginacion from "./paginacion";

export const TablaParametrizable = () => {

    return (
        <table className="m-2 p-3 bg-white rounded-lg shadow-lg border-1 text-black">
            <thead>
                <tr className="bg-slate-100 flex flex-row font-semibold justify-between m-2 p-3 rounded-xl">
                    {DatosTabla.header.map((columna) => (
                        <th
                            className="px-2"
                            key={columna.texto}
                        >
                            { columna.texto }
                        </th>
                    ))}
                </tr>
            </thead>
            <Paginacion />
        </table>
    );
};