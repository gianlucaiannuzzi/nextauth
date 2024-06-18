// ! Este componente se ejecuta del lado del cliente.
"use client"
import { ComboProps } from "../interfaces/interfaces";

export const Combobox = ({ opciones, selectedValue, onChange, placeholder }: ComboProps) => {

    return (
        <>
            <select
                defaultValue={selectedValue}
                className="bg-gray-50 border border-gray-300 text-slate-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
                onChange={(e) => onChange(Number(e.target.value))}
            >
                <option 
                    value={-1}
                    className="text-xs text-slate-700"
                >
                    {placeholder}
                </option>
                {opciones.map((opcion) => (
                    <option 
                        key={opcion}
                        value={opciones.indexOf(opcion)}
                        className="text-xs"

                    >
                        {opcion}
                    </option>
                ))}
            </select>
        </>
    );
};