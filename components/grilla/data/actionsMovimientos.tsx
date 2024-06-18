import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { toast } from 'sonner'

// TODO Funcion que añada un registro a la grilla.
const handleAdd = () => {
    toast.success("Agregando un registro...");
    console.log("Agregando un registro...");
};

// TODO Funcion que modifique un registro de la grilla.
const handleEdit = (registro: Record<string, string | number>) => {
    toast.warning("Hubo un problema editando el siguiente registro: " + registro);
    console.log(registro);
    console.log("Editando un registro...");
};

// TODO Funcion que borre un registro de la grilla.
const handleDelete = (registro: Record<string, string | number>) => {
    toast.error("No se pudo eliminar el siguiente registro: " + registro);
    console.log(registro);
    console.log("Borrando un registro...");
};

export const ActionsMovimientos = [
    {
        icono: CirclePlus,
        modificaRegistro: false,
        style: 'text-blue-500 hover:text-blue-300',
        funcion: handleAdd
    },
    {
        icono: Pencil,
        modificaRegistro: true,
        style: 'text-blue-500 hover:text-blue-300',
        funcion: handleEdit
    },
    {
        icono: Trash2,
        modificaRegistro: true,
        style: 'text-red-500 hover:text-red-300',
        funcion: handleDelete
    }
];