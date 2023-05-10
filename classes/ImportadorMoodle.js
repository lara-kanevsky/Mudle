const { Builder, By, Key, until } = require('selenium-webdriver');
//const webScrapingUtils = require('./utils/webScrapingUtils');
const config = require("../config");
const { get } = require('selenium-webdriver/http');
const loginErrorMessage = "No se pudo loguear. ";
const foundErrorMessage = "Error encontrado: ";

class ImportadorMoodle {
	constructor(username,password){
		this.username = username??config.cuentaMoodle.username;
		this.password = password??config.cuentaMoodle.password;
	}

	async login(driver, loginUrl, loginData) {
		//Despues agregar validacion de si se logueo o tiro error
		await driver.get(loginUrl);
		await driver.findElement(By.id('username')).sendKeys(loginData.username, Key.TAB);
		await driver.findElement(By.id('password')).sendKeys(loginData.password, Key.RETURN);
	}

	async getSeccionesWebElements(driver) {
		let secciones = await driver.findElements(By.xpath('//div[@class="course-content"]//li[@class="nav-item"]'));
		return secciones;
	}

	async getItemsJSON(driver) {
		let itemsWebElements = await getItems(driver);
		let baseUrl = "https://aulavirtual.instituto.ort.edu.ar/";
		let itemsJSON = await Promise.all(
			itemsWebElements.map(async (itemWebElement) => {
				let id = await itemWebElement.getAttribute("id");
				id = id.split("-")[1];
				let itemClassList = await itemWebElement.getAttribute("className");
				itemClassList = itemClassList.split(" ");
				console.log("itemClassList", itemClassList);
				let type = itemClassList.filter(item => item.startsWith('modtype_'))[0].split("_")[1];
				///mod/assign/view.php?id=85131
	
				console.log("Type: ", type);
				return {
					name: await itemWebElement.getAttribute("textContent"),
					url: `${baseUrl}mod/${type}/view.php?id=${id}`,
					type: type,
				};
			})
		);
		consoleLogearArray(itemsJSON);
		return itemsJSON;
	}

	async getItems(driver) {
		let items = await driver.findElements(By.xpath('//li[contains(concat(" ", @class, " "), "activity")]'));
		consoleLogearArray(items)
		return items;
	}

	async getSeccionesJSON(driver) {
		let seccionesWebElements = await getSeccionesWebElements(driver);
		seccionesWebElements.shift();
		let seccionesJSON = await Promise.all(
			seccionesWebElements.map(async (seccionWebElement) => ({
				name: await seccionWebElement.getAttribute("innerText"),
				url: await seccionWebElement.getAttribute("baseURI"),
			}))
		);
		await seccionesWebElements.pop().click();
		seccionesWebElements = await getSeccionesWebElements(driver);
		let firstElement = seccionesWebElements.shift();
		let name = await firstElement.getAttribute("innerText");
		let url = await firstElement.getAttribute("baseURI");
		seccionesJSON.unshift({ name: name, url: url });
		return seccionesJSON;
	}

	async getCourse(driver, course) {
		await driver.get(course.url);
		let seccionesJSON = await getSeccionesJSON(driver);
		consoleLogearArray(seccionesJSON);
	
	}

	async getCoursesJSON(driver) {
		let coursesWebElements = await getCoursesWebElements(driver);
	
		let coursesJSON = await Promise.all(
			coursesWebElements.map(async (courseWebElement) => ({
				name: await courseWebElement.getAttribute("innerText"),
				url: await courseWebElement.getAttribute("href"),
			}))
		);
		consoleLogearArray(coursesJSON);
		return coursesJSON;
	}

	async getCoursesWebElements(driver) {
		let courses = await driver.findElements(By.xpath('//div[@data-key="mycourses"]/parent::*/a[contains(@href, "course")]'));
		let courseName = await courses[0].getAttribute("innerText");
		console.log("courses", courseName)
		return courses;
	}
}

async function main() {
	const basePath = "https://aulavirtual.instituto.ort.edu.ar/";
	const loginPath = "login/index.php";

	const username = "45014602";
	const password = "dongato1";
	const loginData = { username: username, password: password };
	const driver = await new Builder().forBrowser('chrome').build();
	await login(driver, basePath + loginPath, basePath, loginData);

	let coursesWebElements = await getCoursesWebElements(driver);
	let courses = await getCoursesJSON(driver);


	await getCourse(driver, courses[0])
	let items = await getItemsJSON(driver);
}

main();

function consoleLogearArray(array) {
	array.forEach(element => {
		console.log("Elemento: ", element)
	})
}