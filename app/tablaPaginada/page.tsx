'use client'

import { DigimonsResponse, SimpleDigimon } from "@/components/digimon";
import DigimonGrid from "@/components/digimon/components/digimon-grid";
import useSWR from "swr";
import { $fetch } from "ofetch";
import { useEffect, useState } from "react";

const getDigimons = async (url: string): Promise<DigimonsResponse> => {
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

const fetcher = (url: string) => fetch(url).then(res => res.json());

{/* // ? Tabla a partir de paginación de la Digiapi. */}
export default function DigimonPage() {

    // const [data, setData] = useState<DigimonsResponse | null>(null);

    // useEffect(() => {
    //     fetch('https://digi-api.com/api/v1/digimon?pageSize=20')
    //         .then(res => res.json())
    //         .then(data => setData(data));
    // }, []);

    const { data, error, isLoading } = useSWR('https://digi-api.com/api/v1/digimon?pageSize=20', fetcher);
    console.log(data);

    return (
        <table>
            <thead>

            </thead>
            {/* <tbody>
                <DigimonGrid digimons={ data.content } />
            </tbody>
            <tfoot className="flex flex-row m-2 justify-center">
                <button onClick={() => cambiarPagina(data.pageable.previousPage)} className="px-2">
                    { data.pageable.previousPage }
                </button>
                <span>
                    { data.pageable.currentPage }
                </span>
                <button onClick={() => cambiarPagina(data.pageable.nextPage)} className="px-2">
                    { data.pageable.nextPage }
                </button>
            </tfoot> */}
        </table>
    );
}