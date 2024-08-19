import puppeteer from 'puppeteer';

export default async (req, res) => {
    // const { url } = req.query;
    const url = 'https://www.mercadolivre.com.br/fritadeira-air-fryer-sem-oleo-afn-40-fr-4l-vermelha-mondial-cor-vermelho-frequncia-60-110v/p/MLB19635459#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-univb-equivalent-offer&wid=MLB2852741978&reco_client=home_navigation-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=4cbd8082-0efa-4195-a248-3c7dc9f2f1c2&sid=recos&c_id=/home/navigation-recommendations/element&c_uid=f08a1915-2eec-4ab3-995f-5b5371fd6ec3';
    console.log('URL:', url);

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(url);

        // const productInfo = await page.evaluate(() => {
        //     const name = document.querySelector('.ui-pdp-title')?.innerText;
        //     const price = document.querySelector('.price-tag-fraction')?.innerText;
        //     return { name, price };
        // });

        await browser.close();

        if (!productInfo.name || !productInfo.price) {
            return res.status(404).json({ error: 'Product information not found' });
        }

        res.status(200).json(productInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};