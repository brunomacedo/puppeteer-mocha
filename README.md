# Testing with Puppeteer, Chai and Mocha

```bash
npm install
```

```bash
npm test
```


## Result

Without *puppeteer.launch* options

![Result](result.png?v=2)


## Open browser

```javascript
puppeteer.launch({
  headless: false,
  slowMo: 50,
  timeout: 1000
})
```
