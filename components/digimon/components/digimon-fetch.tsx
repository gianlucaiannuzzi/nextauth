import { DigimonsResponse, SimpleDigimon } from "@/components/digimon";

const getDigimons = async (pagina: number, digimonsPorPagina: number, url: string): Promise<DigimonsResponse> => {
    const data: DigimonsResponse = await fetch(url)
        .then(res => res.json());

    const digimons = data.content.map(digimon => ({
        id: digimon.id,
        name: digimon.name,
        href: digimon.href,
        image: digimon.image
    }));

    return data;
};

function obtenerDatos(url: string) {
    return getDigimons(1,1,url)
}

interface Props {

    pagina: number,
    digimonsPorPagina: number
};

export default async function DigimonFetch({ pagina, digimonsPorPagina }:Props) {

    const data: DigimonsResponse = await fetch(`https://digi-api.com/api/v1/digimon?pageSize=${digimonsPorPagina}`)
        .then(res => res.json());
    
    const digimons = await getDigimons(pagina, digimonsPorPagina, `https://digi-api.com/api/v1/digimon?pageSize=${digimonsPorPagina}`)

    return (
        await getDigimons(pagina, digimonsPorPagina, `https://digi-api.com/api/v1/digimon?pageSize=${digimonsPorPagina}`)
    );
};