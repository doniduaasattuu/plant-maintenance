export default function ucFirst(word) {
    if (word.length <= 3) {
        return word.toUpperCase();
    }

    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;
}