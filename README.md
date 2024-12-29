# harmony-playwright-framework

#### Clone the repository
```
git clone git@github.com:DineshKuppan/harmony-playwright-framework.git
cd harmony-playwright-framework
```

### Upload reports & results to AWS S3

[AWS S3 Uploader Example](https://www.netguru.com/blog/automated-testing-optimization)

#### Download & Instal Node.JS dependencies 
```
npm install -s
```

#### How to execute tests ?

To execute sample browserstack demo page tests

```
npx playwright test src/tests/browserstack.spec.ts
```

To execute sample Google's YouTube SignIn with test accounts page tests

```
npx playwright test src/tests/sign.in.youtube.spec.ts
```

# Playwright executes test for parallel runs
```
npx playwright test --workers 4
```

# Single test execution
```
npx playwright test -- tests/playwright.navigate.link.test.ts
```