const fs = require("fs");

const puppeteer = require("puppeteer");

const temp = fs.readFileSync(__dirname + "/DrukWide-Medium-App.ttf", {
  encoding: "base64url",
});

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("url");

  // const header = await page.evaluate(
  //   () => document.getElementById("header").innerHTML
  // );

  // fs.writeFileSync("temp.html", header, () => {
  //   console.log("write done");
  // });

  let footer;

  try {
    footer = await page.evaluate(
      () => document.getElementById("invisible-footer").innerHTML
    );
  } catch (e) {
    footer = "<p></p>";
  }

  await page.screenshot();

  try {
    await page.pdf({
      path: "test.pdf",
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<p></p>",
      footerTemplate: footer,
      margin: { top: 0, bottom: 0 },
      // margin: { top: 50, bottom: 100 },
    });
  } catch (e) {
    console.log(45, e);
  }

  await browser.close();
}

start();
