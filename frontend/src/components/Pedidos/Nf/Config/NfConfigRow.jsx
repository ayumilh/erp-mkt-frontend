'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import { useRouter } from 'next/navigation';

const data = [
  {
    contaNotaFiscal: '12345',
    cnpj: '12.345.678/0001-99',
    lojaAssociada: 'Loja A',
    certificadoA1: 'Certificado A1 - 001',
    classeImpostoPadrao: 'Classe 1',
    status: 'Ativo'
  },
  {
    contaNotaFiscal: '67890',
    cnpj: '98.765.432/0001-88',
    lojaAssociada: 'Loja B',
    certificadoA1: 'Certificado A1 - 002',
    classeImpostoPadrao: 'Classe 2',
    status: 'Inativo'
  },
  {
    contaNotaFiscal: '11223',
    cnpj: '11.223.344/0001-77',
    lojaAssociada: 'Loja C',
    certificadoA1: 'Certificado A1 - 003',
    classeImpostoPadrao: 'Classe 3',
    status: 'Ativo'
  },
  {
    contaNotaFiscal: '44556',
    cnpj: '44.556.667/0001-66',
    lojaAssociada: 'Loja D',
    certificadoA1: 'Certificado A1 - 004',
    classeImpostoPadrao: 'Classe 4',
    status: 'Inativo'
  }
];

export default function NfConfigRow () {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader numColumns={6}/>
      ) : data.length > 0 ? (<>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm text-start dark:text-gray-200">{item.contaNotaFiscal}</td>
                <td className="pr-3 py-3 md:py-4 text-sm text-center dark:text-gray-200">{item.cnpj}</td>
                <td className="pr-3 py-3 md:py-4 text-sm text-center dark:text-gray-200">{item.lojaAssociada}</td>
                <td className="pr-3 py-3 md:py-4 text-sm text-center dark:text-gray-200">{item.certificadoA1}</td>
                <td className="pr-3 py-3 md:py-4 text-sm text-center dark:text-gray-200">{item.classeImpostoPadrao}</td>
                <td className='pr-4 lg:pr-6 pl-3 py-3 md:py-4 text-center'>
                  <span className={`${item.status === 'Ativo' ? 'bg-green-200' : 'bg-red-200'} text-sm px-3 py-2 rounded-full font-medium text-neutral-700`}>{item.status}</span>
                </td>
              </tr>
            ))}
        </>
      ) : (
        <div className="w-full py-12 text-center">
          <ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/>
          <p>Não há dados de nota fiscal disponíveis no momento. Por favor, verifique novamente mais tarde.</p>
        </div>
      )}
    </>
  );
};