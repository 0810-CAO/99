namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export const LettersValidator  = (value) =>{
        return lettersRegexp.test(value);
    }
}
//修改tscconfig.json中module   outFile  outDir几个配置即可不需要打包