export function formatDate(text) {
    const date = new Date(text);
    let formatedDate = "";
    formatedDate += addZeroBeforeNumber(date.getDate()) + ".";
    formatedDate += addZeroBeforeNumber(date.getMonth() + 1) + ".";
    formatedDate += date.getFullYear() + ". ";
    formatedDate += addZeroBeforeNumber(date.getHours()) + ":";
    formatedDate += addZeroBeforeNumber(date.getMinutes()) + ":";
    formatedDate += addZeroBeforeNumber(date.getSeconds());
    return formatedDate;
}

function addZeroBeforeNumber(number) {
    if (number < 10) {
        return "0" + number
    } else {
        return number
    }
}