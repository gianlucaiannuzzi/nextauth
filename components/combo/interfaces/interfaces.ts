// ? Los parametros necesarios para crear el combobox.
// ? opciones: array con la cantidad de elementos para nuestro combobox.
// ? selectedValue: valor que va a ser seleccionado por defecto. Es numerico por la posicion del arreglo.
// ? onChange: funcion que se va a ejecutar al seleccionar un elemento del combo.
// ? placeholder: valor sin sentido logico que ocupara la funcion del valor vacio.
// ? style: estilos personalizados para el combo.
export interface ComboProps {
    opciones: string[],
    selectedValue: number,
    onChange: (value: number) => void;
    placeholder: string
}