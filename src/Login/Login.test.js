import '@testing-library/jest-dom';
const { debug } = require('dotenv/lib/env-options');
const puppeteer = require('puppeteer');

test('Check login with empty input username and password', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1240, height: 1000 });
	await page.goto('http://localhost:3000');
	//jest.spyOn(window, 'alert').mockImplementation(() => {});
	page.on('dialog', async (dialog) => {
		console.log(dialog.type());
		console.log(dialog.message());
		await dialog.accept();
	});
	await page.click('button.btn__login');

	const header = await page.$('.header');
	// expect(window.alert).toBeCalledWith('LOGIN FAIL');
	expect(header).toBeNull();
	await browser.close();
}, 20000);

test('Check login with wrong username and password', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1240, height: 1000 });
	await page.goto('http://localhost:3000');

	page.on('dialog', async (dialog) => {
		console.log(dialog.type());
		console.log(dialog.message());
		await dialog.accept();
	});

	await page.type('#username__login', 'minhnhat1', { delay: 20 });
	await page.type('#password__login', '123456', { delay: 20 });

	//await delay(3000);
	await page.click('button.btn__login');
	const header = await page.$('.header');
	expect(header).toBeNull();

	await browser.close();
}, 50000);

test('Login success', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1240, height: 1000 });
	await page.goto('http://localhost:3000');

	page.on('dialog', async (dialog) => {
		console.log(dialog.type());
		console.log(dialog.message());
		await dialog.accept();
	});

	await page.type('#username__login', 'admin', { delay: 20 });
	await page.type('#password__login', '123456', { delay: 20 });

	await page.click('button.btn__login');
	await delay(1000);
	const header = await page.$('.header');
	expect(header).not.toBeNull();
	await browser.close();
}, 30000);

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

// async function handleAlert(page: Page): Promise<void> {
// 	const element = await page.$('#alert');

// 	element.click();

// 	page.on('dialog', async (dialog) => {
// 		console.log(dialog.type());

// 		console.log(dialog.message());

// 		await dialog.accept();
// 	});
// }
