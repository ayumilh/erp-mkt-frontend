'use client'
import axios from 'axios';
import React, { useState } from 'react'

const CodeToken = () => {
  const [code, setCode] = useState(null);

  const generateCode = async () => {
    let url = 'https://imparcialista.github.io/imparcialista/code?code=TG-6672409cdc8cff00019a957d-584098527'

    let parsedUrl = new URL(url)
    let code = parsedUrl.searchParams.get('code')
    console.log(code)
    setCode(code);

    try{
      const res = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/redirect', {code});
      console.log(res.data);
    }catch (error) {
      console.error('Erro ao enviar o código para o servidor', error);
    }
  }

  return (
    <div>
      <button onClick={generateCode}>Gerar Token do Mercado Livre</button>
      <p>{code ? `O codigo é ${code}` : "Carregando..."}</p>
    </div>
  )
}

export default CodeToken