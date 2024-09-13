import puppeteer from 'puppeteer';

const screenshotHandler = async (req, res) => {
    const { url } = req.query;
    console.log('URL:', url);

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);

        // const productInfo = await page.evaluate(() => {
        //     const name = document.querySelector('.ui-pdp-title')?.innerText;
        //     const price = document.querySelector('.price-tag-fraction')?.innerText;
        //     return { name, price };
        // });

        // Adicione mais lógica aqui, se necessário

        await browser.close();
        res.status(200).json({ message: 'Screenshot taken successfully' });
    } catch (error) {
        console.error('Error taking screenshot:', error);
        res.status(500).json({ error: 'Failed to take screenshot' });
    }
};

export default screenshotHandler;