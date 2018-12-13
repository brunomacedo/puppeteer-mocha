/* global page browser */
import puppeteer from 'puppeteer'
import { expect } from 'chai'

before(async () => {
  const opts = { headless: false, slowMo: 50, timeout: 1000 }

  global.browser = await puppeteer.launch(opts)
  global.page = await browser.newPage()
  await page.setViewport({ width: 1360, height: 768 })
})

describe('voucher validate', () => {
  describe('partner 1', () => {
    it('should return a valid voucher', async () => {
      await page.goto('https://produtos.uol.com.br/bancaelivros/parceiros')
      await page.type('.top > .container > .col-md-offset-1 > .form > .input_voucher', 'fe7c00c8-689b-4c8a-b7ca-165dc6135beb')
      await page.click('.top > .container > .col-md-offset-1 > .form > .btn')

      await page.waitFor(300)

      const msgSuccess = await page.evaluate(() => document.querySelector('.alert-message span').innerText)
      expect(msgSuccess).to.be.equal('Enviado com sucesso, estamos redirecionando.')
    })
  })

  describe('partner 2', () => {
    it('should return an invalid cnpj', async () => {
      await page.goto('https://produtos.uol.com.br/lp/tim')
      await page.type('.top > .container-flex > .col-left > .form > .cnpj', '00000')
      await page.type('.top > .container-flex > .col-left > .form > .voucher', '00000')
      await page.click('.top > .container-flex > .col-left > .form > .btn-resgatar')

      await page.waitFor(300)

      const msgSuccess = await page.evaluate(() => document.querySelector('.alert-message span').innerText)
      expect(msgSuccess).to.be.equal('CNPJ inválido.')
    })
  })
})

after(async () => {
  await page.close()
  await browser.close()
})
