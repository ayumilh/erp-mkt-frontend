'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


const NfRow = () => {
    const [nfData, setNfData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNf = async () => {
            try {
                const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/get-notes");
                console.log(response.data.orders);
                if (response.data && Array.isArray(response.data.orders)) {
                    const restructuredData = response.data.orders.map((data) => {
                        return {
                            numero: data.numero,
                            chave: data.chave,
                            cliente: data.cliente,
                            tipo: data.tipo,
                            valor: data.valor_nota_fisc,
                            pedido: data.pedido,
                            tempo: data.tempo,
                            status: data.estado,
                        };
                    });
                    setNfData(restructuredData);
                } else {
                    setNfData([]);
                }
            } catch (error) {
                setNfData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNf();
    }, []);


    return (<>
        {isLoading ? (
            <SkeletonLoader numColumns={4} />
        ) : nfData.length > 0 ? (
            nfData.map((nf, index) => (
                <tr key={index} className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
                    <td className="w-40 md:w-52 lg:w-auto pl-6 pr-4 py-4 md:py-5 text-start"><p className="w-40 md:w-52 lg:w-auto font-medium">{nf.numero}</p></td>
                    <td className="px-4 py-4 md:py-5 text-center">{nf.chave}</td>
                    <td className="px-4 py-4 md:py-5 text-center">{nf.tipo}</td>
                    <td className="px-4 py-2 md:py-5 text-center">{nf.cliente}</td>
                    <td className="px-4 py-2 md:py-5 text-center">{nf.valor}</td>
                    <td className="px-4 py-2 md:py-5 text-center">{nf.pedido}</td>
                    <td className="px-4 py-2 md:py-5 text-center">{nf.tempo}</td>
                    <td className="px-4 py-2 md:py-5 text-center">{nf.status}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="4">
                    <div className="w-full py-12">
                        <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8 mx-10">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};

export default NfRow;