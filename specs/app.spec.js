/* global page browser */
import puppeteer from 'puppeteer'
import { expect } from 'chai'

before(async () => {
  const opts = { headless: false, slowMo: 50, timeout: 1000 }

  global.browser = await puppeteer.launch()
  global.page = await browser.newPage()
  await page.setViewport({ width: 1201, height: 668 })
})

describe('Navegate to webpage:', () => {
  it('should verify if the input is field', async () => {
    await page.goto('https://produtos.uol.com.br/lp/banca-digital/porto-seguro')
    await page.click('.header-content > .row > .col-xs-24 > .container-form > .form-voucher > .btn_voucher')

    await page.waitFor(300)

    const msgSuccess = await page.evaluate(() => document.querySelector('.alert-message div').innerText)
    expect(msgSuccess).to.be.equal('Preencha todos os campos.')
  })
})

after(async () => {
  await page.close()
  await browser.close()
})
