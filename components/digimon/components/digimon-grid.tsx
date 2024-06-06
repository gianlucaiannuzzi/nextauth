import DigimonCard from "@/components/digimon/components/digimon-card";
import { DigimonsResponse, SimpleDigimon } from "@/components/digimon";

interface Props {
    digimons: SimpleDigimon[];
}

export default async function DigimonGrid({ digimons }:Props) {
    
    return (
        <div className="grid grid-cols-4 grid-rows-4 text-white">
            { digimons.map( digimon => (
                <DigimonCard key={ digimon.id } digimon={ digimon }/>
            ))}
        </div>
    );
}