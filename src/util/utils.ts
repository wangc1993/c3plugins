/* 字符串高亮 */
const highlightWords = (str = '', searchText = ''): string => {
    const word: string = searchText;
    /* 单个字符串/字符串数组的高亮 */
    const highlightCharsToStr = (chars: any): string => {
        const str = chars.length > 0 ? typeof chars === 'string' ? `<span class='highlight'>${chars}</span>` : `<span class='highlight'>${chars.join('')}</span>` : '';
        return str;
    };
    if (word.length === 0 || str.length === 0) {
        return str;
    }
    /* 判断是否搜索的文本包含目标文本 */
    if (word.length > str.length && word.includes(str)) {
        return highlightCharsToStr(str);
    }

    let result: string = '';
    let lastHighlightChars: string[] = [];
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
            } else {
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
/* 为目标元素(应该是静态元素、不是动态添加的)提供移动效果 */
const moveTarget = (ele) => {
    let dv = document.querySelector(ele);
    let x = 0, y = 0, l = 0, t = 0;
    /* 移动效果是否结束的标志 */
    let moveFlag = false;
    /* 鼠标按下事件 */
    dv.addEventListener('mousedown', (e) => {
        /* 获取x坐标和y坐标 */
        x = e.clientX;
        y = e.clientY;
        /* 获取左部和顶部的偏移量 */
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        moveFlag = true;
        //设置样式
        dv.style.cursor = 'move';
    })
    /* 鼠标抬起事件 */
    dv.addEventListener('mouseup', (e) => {
        moveFlag = false;
        dv.style.cursor = 'default';
    })
    /* 鼠标移动 */
    window.onmousemove = (e) => {
        if (moveFlag == false) {
            return;
        }
        /* 获取x和y */
        let nx = e.clientX;
        let ny = e.clientY;
        /* 计算移动后的左偏移量和顶部的偏移量 */
        let nl = nx - x + l;
        let nt = ny - y + t;
        /* 鼠标出界 */
        if (nl < 0 || nt < 0) {
            moveFlag = false;
            dv.style.cursor = 'default';
        }
        if (nl >= 0) {
            dv.style.left = nl + 'px';
        }
        if (nt >= 0) {
            dv.style.top = nt + 'px';
        }
    }
}
export {
    highlightWords,
    moveTarget
}