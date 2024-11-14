import { describe } from "mocha";
import { afterEach, beforeEach, it } from "node:test";
import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { expect } from 'chai';

describe('Saucedemo test', async () => {
    let driver: WebDriver;
    
    beforeEach(async() => {
        driver = await new Builder().forBrowser(Browser.EDGE).build();
        await driver.manage().window().maximize();
        await driver.get("https://www.saucedemo.com");
    });
        
    afterEach(async() => {
        await driver.quit();
    });

    it('Test flow', async () => {
        await driver.findElement(By.css('input[id=user-name]')).sendKeys('standard_user'); 
        await driver.findElement(By.css('input[id=password]')).sendKeys('secret_sauce');  
        await driver.findElement(By.id('login-button')).click(); 
        await driver.findElement(By.name('add-to-cart-sauce-labs-backpack')).click();
        await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light')).click();
        await driver.findElement(By.css('div.shopping_cart_container [data-test$="link"]')).click();
        await driver.wait(until.elementLocated(By.css('div.cart_footer [data-test="checkout"]')), 3000);
        await driver.findElement(By.xpath("//button[@id='checkout']")).click();
        await driver.findElement(By.css("input[id='first-name']")).sendKeys('User');
        await driver.findElement(By.id('last-name')).sendKeys('Test');
        await driver.findElement(By.id('postal-code')).sendKeys('12345');
        await driver.findElement(By.id('continue')).click(); 
        await driver.wait(until.urlIs("https://www.saucedemo.com/checkout-step-two.html"), 5000);
        await driver.findElement(By.xpath("//button[@id='finish']")).click();
        expect(await driver.findElement(By.xpath("//h2[@class='complete-header']")).getText()).to.equal('Thank you for your order!');
        await driver.findElement(By.id('back-to-products')).click();
    });
});
            