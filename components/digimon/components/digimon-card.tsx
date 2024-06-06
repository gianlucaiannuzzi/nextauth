import { SimpleDigimon } from "@/components/digimon";
import Image from "next/image";

interface Props {
    digimon: SimpleDigimon;
}

export default function DigimonCard({ digimon }:Props) {

    return (
        <div className="flex flex-col justify-center items-center bg-orange-400 m-3 rounded-xl">
            <div className="text-xl font-bold">
                { digimon.id.toString() +" - "+ digimon.name }
            </div>
            <div className="border-black border-2 rounded-sm">
                <Image 
                    src={ digimon.image } 
                    priority={ false } 
                    alt="Imagen del Digimon" 
                    width={200} 
                    height={200}
                />
            </div>
        </div>
    );
}