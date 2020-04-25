const puppeteer = require('puppeteer')

;(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome-stable',
    })
    const page = await browser.newPage()
    await page.goto('http://www.google.com')

    await page.screenshot({ path: 'test.png' })

    await browser.close()
})()
