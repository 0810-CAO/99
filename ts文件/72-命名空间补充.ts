namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export const LettersValidator  = (value) =>{
        return lettersRegexp.test(value);
    }
}