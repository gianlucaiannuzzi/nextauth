import { DigimonsResponse } from "@/components/digimon";

const getDigimons = async (url: string): Promise<DigimonsResponse> => {
    var data = null;
    if (url === "") {
        data = await fetch(`https://digi-api.com/api/v1/digimon?pageSize=20`).then(res => res.json());
    } else {
        data = await fetch(url).then(res => res.json());
    }
    return data;
};

export default async function Paginacion() {

    var data = await getDigimons("")

    async function cambiarPagina(url: string) {
        data = await getDigimons(url);
    }

    return (
        <>
            <button onClick={() => cambiarPagina(data.pageable.previousPage)} className="px-2">
                {data.pageable.currentPage - 1}
            </button>
            <span>
                {data.pageable.currentPage}
            </span>
            <button onClick={() => cambiarPagina(data.pageable.nextPage)} className="px-2">
                {data.pageable.currentPage + 1}
            </button>
        </>
    );
}