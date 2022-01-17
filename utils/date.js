export const getYear = () => {
	const date = new Date();
	return date.getFullYear()
}

export const getMonth = (key) => {
	const date = new Date();
	return addZero(date.getMonth() + 1)
}

export const getDay = (key) => {
	const date = new Date();
	return addZero(date.getDate());
}

const addZero = function(date) {
	return date > 9 ? date : `0${date}`;
};
