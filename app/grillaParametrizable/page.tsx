import { GrillaParametrizable } from "../../components/grilla/index";
import { DatosMovimientos } from "@/components/grilla/data/datosMovimientos";
import { HeaderMovimientos } from "@/components/grilla/data/headerMovimientos";

const Page = () => {

    const header = HeaderMovimientos;
    const movimientos = DatosMovimientos.movimientos;
    console.log(header.length);
    return (
        <GrillaParametrizable header={header} body={movimientos} paginacion={true} clase="ABM" filasPorPagina={5} />
    );
};

export default Page;