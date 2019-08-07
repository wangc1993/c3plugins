const highlightWords = function (str = '', searchText = '') {
    const word = searchText;
    /* 单个字符串/字符串数组的高亮 */
    const highlightCharsToStr = function (chars) {
        const str = chars.length > 0 ? typeof chars === 'string' ? `<span class='highlight'>${chars}</span>` : `<span class='highlight'>${chars.join('')}</span>` : '';
        return str;
    };
    if (word.length === 0 || str.length === 0) {
        return str;
    }
    /* 判断是否搜索的文本包含目标文本 */
    if(word.length > str.length && word.includes(str)){
        return highlightCharsToStr(str);
    }

    let result = '';
    let lastHighlightChars = [];
    let lastHighlightIndex = -1;
    /* 遍历目标字符串 */
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        /* 计算搜索内容是否包含目标字符串的某个字符，并输出位置 */
        const curHighlightIndex = word.indexOf(char, lastHighlightIndex + 1);
        /* 判断是否包含 */
        if (curHighlightIndex !== -1) {
            /* 判断是否需要将光标移至当前 */
            if (lastHighlightIndex === -1) {
                lastHighlightIndex = curHighlightIndex;
            }
            /* 计算当前光标与之前的距离 */
            const step = curHighlightIndex - lastHighlightIndex;
            /* <=1,只要前面可以匹配后面就不高亮:helo->he1lo（searchText）只高亮he 
            ** <=2,可以匹配前后高亮在搜索内容中不超过1个字符：helo->he1lo（searchText）高亮helo,helo->he11lo（searchText）高亮he
            */
           /* if (step <= 2 && step >= 0) { */
            if (step >= 0) {
                /* 小于等于1时进行高亮数组和光标的更新 */
                lastHighlightChars.push(char);
                lastHighlightIndex = curHighlightIndex;
            }else{
                /* 进行当前高亮数组的高亮和拼接 */
                result += highlightCharsToStr(lastHighlightChars) + char;
                lastHighlightChars = [];
            }

            if (i === str.length - 1) {
                result += highlightCharsToStr(lastHighlightChars);
            }
        }
        else {
            /* 搜索内容不包含目标字符 */
            lastHighlightIndex = -1;
            /* 将之前的高亮字符串数组进行高亮 */
            const parts = highlightCharsToStr(lastHighlightChars);
            lastHighlightChars = [];
            /* 拼接 */
            result += parts + char;
        }
    }
    return result;
};
export {
    highlightWords
}