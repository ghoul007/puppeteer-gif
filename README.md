## Install puppeter without chrome

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install puppeteer
```

## Make Gif

To generate Gif from some images PNG:
```js
const screens = []
for (let i = 1; i < 5; ++i) {
    const filename = path.resolve(__dirname, `IMG${new Date().getTime()}.png`)
    process.stdout.write('.')
    screens.push(page.screenshot({ path: filename, fullPage: true }))
    await sleep(1)
}

await sleep(1)

await Promise.all(screens)

const encoder = new GIFEncoder(1024, 768)

await pngFileStream(path.resolve(__dirname, 'IMG*png'))
    .pipe(encoder.createWriteStream({ repeat: 0, delay: 200, quality: 20 }))
    .pipe(fs.createWriteStream(path.resolve(__dirname, 'screenshot.gif')))
```