import '@testing-library/jest-dom';
const { debug } = require('dotenv/lib/env-options');
const puppeteer = require('puppeteer');

// test('Check create new product with empty all input', async () => {
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		slowMo: 10,
// 	});
// 	const page = await browser.newPage();
// 	await page.setViewport({ width: 1900, height: 1300 });
// 	await page.goto('http://localhost:3000');

// 	page.on('dialog', async (dialog) => {
// 		console.log(dialog.type());
// 		console.log(dialog.message());
// 		await dialog.accept();
// 	});

// 	await page.type('#username__login', 'admin', { delay: 20 });
// 	await page.type('#password__login', '123456', { delay: 20 });

// 	await page.click('button.btn__login');

// 	//const listLink = await page.$$eval('.nav__link', (el) => el);
// 	// await page.evaluate(() => {
// 	// 	let elements = document.getElementsByClassName('.nav__link');
// 	// 	// for (let i=0;i<4;i++)
// 	// 	for (let element of elements) element.click();
// 	// });
// 	await delay(2000);
// 	await page.click('#kool3');
// 	await page.click('.add__product');

// 	await page.click('.save__product__btn');

// 	const errorName = await page.$eval('#test-name-error', (el) => el.innerHTML);
// 	const errorProcessor = await page.$eval(
// 		'#test-processor-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorDisplay = await page.$eval(
// 		'#test-display-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorMemory = await page.$eval(
// 		'#test-memory-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorHardDrive = await page.$eval(
// 		'#test-harddrive-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorPorts = await page.$eval('#test-port-error', (el) => el.innerHTML);
// 	const errorGraphics = await page.$eval(
// 		'#test-graphic-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorPrice = await page.$eval(
// 		'#test-price-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorSku = await page.$eval('#test-sku-error', (el) => el.innerHTML);
// 	const errorBrand = await page.$eval(
// 		'#test-brand-error',
// 		(el) => el.innerHTML,
// 	);
// 	const errorStatus = await page.$eval(
// 		'#test-status-error',
// 		(el) => el.innerHTML,
// 	);

// 	expect(errorName).toMatch('Not Empty Name');
// 	expect(errorProcessor).toMatch('Not Empty Processor');
// 	expect(errorDisplay).toMatch('Not Empty Display');
// 	expect(errorMemory).toMatch('Not Empty Memory');
// 	expect(errorHardDrive).toMatch('Not Empty Hard Drive');
// 	expect(errorPorts).toMatch('Not Empty Ports');
// 	expect(errorPrice).toMatch('Not Empty Price');
// 	expect(errorGraphics).toMatch('Not Empty Graphics');

// 	expect(errorSku).toMatch('Not Empty SKU');
// 	expect(errorBrand).toMatch('Not Empty Brand');
// 	expect(errorStatus).toMatch('Not Empty Status');

// 	await delay(3000);

// 	await browser.close();
// }, 20000);

// test('Check create new product success', async () => {
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		slowMo: 10,
// 		args: ['--start-fullscreen'],
// 	});
// 	const page = await browser.newPage();
// 	await page.setViewport({ width: 1900, height: 1000 });
// 	await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// 	page.on('dialog', async (dialog) => {
// 		console.log(dialog.type());
// 		console.log(dialog.message());
// 		await dialog.accept();
// 	});

// 	await page.type('#username__login', 'admin', { delay: 20 });
// 	await page.type('#password__login', '123456', { delay: 20 });

// 	await page.click('button.btn__login');

// 	//const listLink = await page.$$eval('.nav__link', (el) => el);
// 	// await page.evaluate(() => {
// 	// 	let elements = document.getElementsByClassName('.nav__link');
// 	// 	// for (let i=0;i<4;i++)
// 	// 	for (let element of elements) element.click();
// 	// });
// 	await delay(2000);
// 	await page.click('#kool3');

// 	await page.click('.add__product');

// 	await page.type('.input__name__product>input', 'admin', { delay: 20 });

// 	await page.type('#test-i-processor', 'coreI5');

// 	await page.type('#test-i-display', '4K');

// 	await page.type('#test-i-display', '4K');
// 	await page.type('#test-i-memory', '8Gb');
// 	await page.type('#test-i-harddrive', '1TB SSD');
// 	await page.type('#test-i-port', 'Thunderbolt ');
// 	await page.type('#test-i-graphic', 'GTX3070');

// 	await page.type('#test-i-price', '900000');
// 	await page.type('#test-i-sku', 'SKU89000');

// 	await page.select('select[name="namebrand"]', 'Dell');

// 	await page.select('select[name="status"]', 'incoming');

// 	//await page.click('.add__image > input');

// 	//await delay(3000);
// 	const inputUploadHandle = await page.$('input[type=file]');

// 	//inputUploadHandle.evaluate((e) => e.click());

// 	let fileToUpload = `C:/Users/C&C LAPTOP/nha3.jpg`;
// 	inputUploadHandle.uploadFile(fileToUpload);

// 	await delay(4000);
// 	await page.click('.save__product__btn');

// 	//await delay(2000);
// 	const nameClear = await page.$eval('#test-i-name', (input) => input.value);

// 	expect(nameClear).toMatch('');

// 	await browser.close();
// }, 20000);

test('Edit product clear name and save', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
		args: ['--start-fullscreen'],
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1900, height: 1000 });
	await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

	page.on('dialog', async (dialog) => {
		console.log(dialog.type());
		console.log(dialog.message());
		await dialog.accept();
	});

	await page.type('#username__login', 'admin');
	await page.type('#password__login', '123456');

	await page.click('button.btn__login');

	await delay(2000);
	await page.click('#kool3');
	await delay(1000);

	await page.evaluate(() => {
		document
			.querySelector(
				'.product__main__body> div:nth-child(2) > .tag__name__more > .btn__down',
			)
			.click();
	});
	delay(3000);
	await page.click('.dropdown-content> div:nth-child(1)');

	await page.evaluate(() => {
		document.querySelector('#test-i-name-edit').value = '';
	});

	await page.evaluate(() => {
		document.querySelector('.edit-check>.save__product__btn').click();
	});

	// await page.click('.edit-check>.save__product__btn');
	const errorName = await page.$eval('#bokool', (el) => el.innerHTML);
	expect(errorName).toMatch('Not Empty Name');

	await browser.close();
}, 50000);

// test('Delete product ', async () => {
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		slowMo: 10,
// 		args: ['--start-fullscreen'],
// 	});
// 	const page = await browser.newPage();
// 	await page.setViewport({ width: 1900, height: 1000 });
// 	await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// 	page.on('dialog', async (dialog) => {
// 		console.log(dialog.type());
// 		console.log(dialog.message());
// 		await dialog.accept();
// 	});

// 	await page.type('#username__login', 'admin', { delay: 20 });
// 	await page.type('#password__login', '123456', { delay: 20 });

// 	await page.click('button.btn__login');

// 	await delay(2000);
// 	await page.click('#kool3');
// 	await delay(1000);
// 	// let itemFirst = await page.$(
// 	// 	'.product__main__body> div:nth-child(2) > .tag__name__more > .btn__down',
// 	// );
// 	await page.evaluate(() => {
// 		document
// 			.querySelector(
// 				'.product__main__body> div:nth-child(2) > .tag__name__more > .btn__down',
// 			)
// 			.click();
// 	});
// 	delay(3000);
// 	await page.click('.dropdown-content> div:nth-child(3)');

// 	await browser.close();
// }, 20000);

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
