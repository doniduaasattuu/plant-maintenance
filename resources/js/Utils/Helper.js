export function ucFirst(word) {
    if (word.length <= 3) {
        return word.toUpperCase();
    }

    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;
}

export function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);
}

export function today() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    const hour = String(today.getHours()).padStart(2, "0");
    const minute = String(today.getMinutes()).padStart(2, "0");
    const second = String(today.getSeconds()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return currentDate;
}

export function date() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;

    return currentDate;
}

export function toFormattedDateTimeString(date) {
    const today = new Date();
    const hour = String(today.getHours()).padStart(2, "0");
    const minute = String(today.getMinutes()).padStart(2, "0");
    const second = String(today.getSeconds()).padStart(2, "0");
    const time = `${hour}:${minute}:${second}`;

    return `${date} ${time}`;
}
