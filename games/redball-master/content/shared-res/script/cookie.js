//Generic function to set cookie
function setCookie(name, value, daysValid) {
	let date = new Date();
	date.setTime(date.getTime() + (daysValid * 24 * 60 * 60 * 1000));
	let exDate = date.toUTCString();
	document.cookie = name + "=" + value + ";expires=" + exDate + ";path=/";
}
//Generic function to read cookie
function getCookie(name) {
	let decodedCookie = decodeURIComponent(document.cookie);
	let cookieArray = decodedCookie.split(';');
	for(let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while(cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}
		if(cookie.indexOf(name) == 0) {
			return cookie.substring(name.length + 1, cookie.length);
		}
	}
	return "";
}
