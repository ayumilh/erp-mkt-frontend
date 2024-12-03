const mercadoLivreGetPrint = async (req, res) => {
    try {
        const userid = req.body.userId;
        console.log('SHIPPING IDS:', req.body)
        const access_token = await validaToken(userid);
        let shipping_ids = req.body.shipping_id;


        console.log("USER ID>", userid)
        console.log('Received shipping_ids:', shipping_ids);

        // Verifica se shipping_ids é um array, se não, transforma em um array
        if (!Array.isArray(shipping_ids)) {
            shipping_ids = [shipping_ids];
        }

        // Converte o array de shipping_ids em uma string separada por vírgulas
        const shipping_ids_string = shipping_ids.join(',');

        console.log('Shipping IDs string:', shipping_ids_string);

        // Faz a requisição para obter o PDF das etiquetas de envio
        const response = await fetch(`https://api.mercadolibre.com/shipment_labels?shipment_ids=${shipping_ids_string}&response_type=pdf`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            // Tenta obter a mensagem de erro detalhada da resposta
            const errorData = await response.json();
            let errorMessage = 'Erro na solicitação do token';
            if (errorData && errorData.error_description) {
                errorMessage = errorData.error_description;
            }
            throw new Error(errorMessage);
        }


        // Obtém o PDF da resposta como um ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();
        const pdfBuffer = Buffer.from(arrayBuffer);

        // Configura os cabeçalhos da resposta para indicar que é um PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="etiqueta.pdf"');

        // Envie o PDF como resposta
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Erro:', error);
        // Envia uma mensagem de erro na resposta
        res.status(500).send({ error: 'Erro ao processar a solicitação de Impressão.' });
    }
};