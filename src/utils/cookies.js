export const createCookie= (cookieName, value)=> {
    document.cookie = cookieName + "=" + value +";path=/";
}

export const readCookie = (cookieName)=> {
    let name = cookieName + "=";
    let spli = document.cookie.split(';');
    for (var j = 0; j < spli.length; j++) {
        let char = spli[j];
        while (char.charAt(0) === ' ') {
            char = char.substring(1);
        }
        if (char.indexOf(name) === 0) {
            return char.substring(name.length, char.length);
        }
    }
    return "";
}

export const deleteCookie = (name) =>{
    document.cookie = name + '=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
} 