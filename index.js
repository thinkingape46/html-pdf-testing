const fs = require("fs");

const puppeteer = require("puppeteer");

const temp = fs.readFileSync(__dirname + "/DrukWide-Medium-App.ttf", {
  encoding: "base64url",
});

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:5010/003-SneakerScheduleTemplate.ejs");

  let header = `<html><head><style>@font-face {
    font-family: "druk-wide-medium";
    src: url(data:font/opentype; base64, ${temp});
}</style></head><body>`;

  header += await page.evaluate(
    () => document.getElementById("header").innerHTML
  );

  header += `</body></html>`;

  fs.writeFileSync("temp.html", header, () => {
    console.log("write done");
  });

  const footer = await page.evaluate(
    () => document.getElementById("footer").innerHTML
  );

  await page.pdf({
    path: "test.pdf",
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: footer,
    margin: { top: 100, bottom: 100 },
  });

  await browser.close();
}

start();
