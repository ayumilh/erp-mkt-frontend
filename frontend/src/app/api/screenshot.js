import puppeteer from 'puppeteer';

export default async (req, res) => {
    const { url } = req.query;
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