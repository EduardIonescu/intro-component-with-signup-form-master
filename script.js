const namePretty = {
	"first-name": "First Name",
	"last-name": "Last Name",
	password: "Password",
};
const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const submitForm = () => {
	checkInputField("first-name");
	checkInputField("last-name");
	checkInputEmail("email");
	checkInputField("password");
};

const checkInputField = (inputName) => {
	[inputSelected, checkErrorExist] = getData(inputName);

	if (inputSelected.value == "" && !checkErrorExist) {
		toggleErrorAndBorder(true, checkErrorExist, inputSelected);
		createErrorText(inputName, inputSelected);
	} else if (inputSelected.value == "") {
		if (checkErrorExist) {
			toggleErrorAndBorder(true, checkErrorExist, inputSelected);
		}
	} else if (checkErrorExist) {
		toggleErrorAndBorder(false, checkErrorExist, inputSelected);
	} else {
	}
};

const checkInputEmail = (inputName) => {
	[inputSelected, checkErrorExist, emailHasRightFormat] = getData(inputName);

	if (!emailHasRightFormat && !checkErrorExist) {
		toggleErrorAndBorder(true, checkErrorExist, inputSelected);
		createErrorText(inputName, inputSelected);
	} else if (!emailHasRightFormat) {
		toggleErrorAndBorder(true, checkErrorExist, inputSelected);
	} else if (checkErrorExist && emailHasRightFormat) {
		toggleErrorAndBorder(false, checkErrorExist, inputSelected);
	}
};

// refactored to make everything cleaner
const getData = (inputName) => {
	let inputSelected = document.querySelector(`.${inputName}`);
	let checkErrorExist = document.querySelector(`#${inputName}-error`);
	let emailHasRightFormat = emailRegex.test(inputSelected.value);

	return [inputSelected, checkErrorExist, emailHasRightFormat];
};

// Create red p under input
const createErrorText = (inputName, inputSelected) => {
	const p = document.createElement("p");
	p.classList.add(`error-text`);
	p.setAttribute("id", `${inputName}-error`);
	p.style.display = "block";
	if (inputName == "email") {
		p.innerText = `Looks like this is not a valid email`;
	} else {
		p.innerText = `${namePretty[inputName]} cannot be empty`;
	}
	inputSelected.after(p);
};

// pretty selfexplanatory
const toggleErrorAndBorder = (errorStatus, checkErrorExist, inputSelected) => {
	if (errorStatus) {
		if (checkErrorExist) {
			checkErrorExist.style.display = "block";
		}
		inputSelected.style.borderColor = "var(--primary-red)";
		inputSelected.classList.add("error");
	} else {
		checkErrorExist.style.display = "none";
		inputSelected.classList.remove("error");
		inputSelected.style.borderColor = "var(--neutral-grayish-blue)";
	}
};
