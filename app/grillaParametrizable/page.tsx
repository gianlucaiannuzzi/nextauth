"use client"

import { GrillaParametrizable } from "../../components/grilla/index";
import { HeaderMovimientos } from "@/components/grilla/index";
import { ActionsMovimientos } from "@/components/grilla/index";
import { DatosMovimientos } from "@/components/grilla/index";
import { Toaster } from 'sonner'

const Page = () => {

    const header = HeaderMovimientos;
    const actions = ActionsMovimientos;
    const movimientos = DatosMovimientos.movimientos;
    return (
        <>
            <GrillaParametrizable header={header} actions={actions} body={movimientos} clase="ABM" filasPorPagina={5} /><Toaster richColors closeButton/>
        </>
    );
};

export default Page;