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

export const isMobile = () => {
    return window.innerWidth <= 768;
};

export const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
};

export const selectOptions = (type) => {
    if (type == "operational") {
        return [
            {
                value: 1,
                label: "Running",
            },
            {
                value: 0,
                label: "Stopped",
            },
        ];
    } else if (type == "cleanliness") {
        return [
            {
                value: 1,
                label: "Clean",
            },
            {
                value: 0,
                label: "Dirty",
            },
        ];
    } else if (type == "goodness") {
        return [
            {
                value: 1,
                label: "Good",
            },
            {
                value: 0,
                label: "Not Good",
            },
        ];
    } else {
        return [
            {
                value: 1,
                label: "Yes",
            },
            {
                value: 0,
                label: "No",
            },
        ];
    }
};
