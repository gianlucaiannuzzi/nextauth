export interface ConsultaMovimientos {
    identificacionCuenta: IdentificacionCuenta;
    movimientos: Movimiento[];
}

export interface IdentificacionCuenta {
    tipoCuenta: string;
    descripcion: string;
    nroCuenta: string;
    moneda: string;
    especie: string;
}

export interface Movimiento {
    fecha: Date;
    fechaIngreso: Date;
    referencia: string;
    detalle: string;
    cuit: string;
    monto: number;
    codigoOperacion: string;
    nroOperacion: number;
    plataforma: string;
    canal: string;
}