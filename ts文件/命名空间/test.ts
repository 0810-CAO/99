namespace Validation1 {
  const lettersRegexp = /^[A-Za-z]+$/;
  export const LettersValidator  = (value) =>{
      return lettersRegexp.test(value);
  }
}