const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

;(async () => {
    const browser = await puppeteer.launch({
        // headless: false,
        executablePath: '/usr/bin/google-chrome-stable',
    })
    const page = await browser.newPage()
    page.setViewport({
        width: 1024,
        height: 768,
    })
    await page.goto('http://www.google.com')
    await page.type('input', 'ahmed ghoul')

    const screens = []
    for (let i = 1; i < 5; ++i) {
        const filename = path.resolve(__dirname, `T${new Date().getTime()}.png`)
        process.stdout.write('.')
        screens.push(page.screenshot({ path: filename, fullPage: true }))
        await sleep(1)
    }

    await sleep(1)

    await Promise.all(screens)

    const encoder = new GIFEncoder(1024, 768)

    await pngFileStream(path.resolve(__dirname, 'T*png'))
        .pipe(encoder.createWriteStream({ repeat: 0, delay: 200, quality: 20 }))
        .pipe(fs.createWriteStream(path.resolve(__dirname, 'screenshot.gif')))

    await browser.close()
})()
