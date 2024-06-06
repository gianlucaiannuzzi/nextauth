import { TablaParametrizable } from "@/components/tabla/components/tabla";

const Page = () => {
    return (
        <div className="bg-white">
            {/* // ? Tabla a partir de un JSON armado. */}
            <TablaParametrizable />
        </div>
    );
};

export default Page;