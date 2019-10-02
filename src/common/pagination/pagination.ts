import '../message/message.less';
import './pagination.less';
import Message from '../message/message';
/*每页显示多少插件*/
const pageArr = [8,12,16,20];
export default class Pagination {
    state: any;
    constructor(options) {
        if (!options.totalCount || !options.container) return;
        this.state = {
            pageNumber: options.pageNumber || 1,//当前页
            perPageCount: options.perPageCount || pageArr[2],//每页显示的数量
            totalCount: options.totalCount, //总共多少条Item（必须）
            totalPageCount: Math.ceil(options.totalCount / (options.perPageCount || pageArr[2])),//总共多少页
            onPageChange: options.onPageChange || null,
            onPerPageChange: options.onPerPageChange || null,
            container: options.container || 'body',
            maxShowBtnCount: options.maxShowBtnCount || 5,// 不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮（最大7个）
            eventType: options.eventType || 'click',//触发的方式
            activePosition: options.activePosition,//当需要省略符号占位时，确定active的位置
        }
        this.init();
    }
    init() {
        let state = this.state;
        /* 当需要省略符号占位时，计算active的位置 */
        state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2));
        /* 渲染DOM */
        let pageContainer = this.selectorEle(state.container);
        /*左边的每页大小切换*/
        let paginationHTML = `
        <select class="pageSelect">
            ${pageArr.map((number,index)=>
                `<option value=${number} ${number === state.perPageCount ? 'selected' : ''}>${number}</option>`)}
        </select>`;
        /*增加中间的分页*/
        paginationHTML += `
        <ul class="pagination">
        <li class="page-li page-prev no-prev">上一页</li>
        <li class="page-li page-number page-active" data-number='1'>1</li>
        `;
        /* 判断当前页数是否需要显示... */
        if (state.totalPageCount - 2 > state.maxShowBtnCount) {
            paginationHTML += `
            <li class="page-li number-ellipsis ellipsis-head" style="display: none;">...</li>`;
            /* 从2开始，显示6个 */
            for (let i = 2; i < state.maxShowBtnCount + 2; i++) {
                paginationHTML += `<li class="page-li page-number ${i === 1 ? 'page-active' : ''}" data-number='${i}'>${i}</li>`
            }
            /* 显示...以及最后页码 */
            paginationHTML += `
            <li class="page-li number-ellipsis ellipsis-tail">...</li>
            <li class="page-li page-number" data-number='${state.totalPageCount}'>${state.totalPageCount}</li>
            `;
        } else {
            for (let i = 2; i <= state.totalPageCount; i++) {
                paginationHTML += `<li class="page-li page-number" data-number='${i}'>${i}</li>`
            }
        }
        paginationHTML += `<li class="page-li page-next ${state.totalPageCount === 1 ? ' ' + 'no-next' : ''}">下一页</li></ul>`;
        paginationHTML += `<div class="goto"><span>跳至</span><input type="number" class="jumpInput" min=1 max=${state.totalPageCount} /><span>页</span><div>`;
        pageContainer.innerHTML = paginationHTML;
        this.bindEvent();
        this.gotoPage(1);
    }
    bindEvent() {
        let state = this.state;
        let pCNameList = this.selectorEle('.page-li', true);
        let pageNumber: number;
        pCNameList.forEach(item => {
            item.addEventListener(state.eventType, e => {
                const currentPageEle = e.target;
                if (this.hasClass(currentPageEle, 'page-active')) return;
                /* 获取当前元素的自定义属性 */
                let dataNumberAttr = currentPageEle.getAttribute('data-number');
                if (dataNumberAttr) {
                    /* 点击 数字 按钮 */
                    pageNumber = +dataNumberAttr;
                } else if (this.hasClass(currentPageEle, 'page-prev')) {
                    /* 点击 上一页 按钮 */
                    state.pageNumber > 1 && (pageNumber = state.pageNumber - 1);
                } else if (this.hasClass(currentPageEle, 'page-next')) {
                    /* 点击 下一页 按钮 */
                    state.pageNumber < state.totalPageCount && (pageNumber = state.pageNumber + 1);
                }
                pageNumber && this.gotoPage(pageNumber);
            })
        })
        let jumpInput = this.selectorEle('.jumpInput');
        jumpInput.addEventListener('keydown', (e) =>{
            const currentKey: number = e.keyCode;
            if(currentKey === 13){
                pageNumber = +e.target.value;
                /*判断页码是否超出范围*/
                if(pageNumber > state.totalPageCount){
                    let message = new Message({
                            message:`<div>页码超出范围啦，请重新输入！</div>`,
                            type:"warning"
                        });
                        message.showModel();
                }else{
                    this.gotoPage(pageNumber);
                }
            }
        });
        let pageSelect = this.selectorEle('.pageSelect');
        // 每页大小切换
        pageSelect.addEventListener('change', (e) => {
            state.perPageCount = +e.target.value;
            state.totalPageCount = Math.ceil(state.totalCount / (+e.target.value));
            this.init();
        });
    }
    gotoPage(pageNumber) {
        let state = this.state;
        let NumberLiList = this.selectorEle('.page-number', true);
        let len = NumberLiList.length;
        if (!len || this.isIllegal(pageNumber)) return;
        /* 清除active样式 */
        this.removeClass(this.selectorEle(`.page-li.page-active`), 'page-active');
        /* 是否需要省略号 */
        if (state.activePosition) {
            /* 右边的省略号是否出现的判断位 */
            let rEllipseSign = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;
            /* 左边不需要出现省略符号占位 */
            if (pageNumber <= state.maxShowBtnCount && (pageNumber < rEllipseSign)) {
                /* 更新numberPage的内容，先判断是否需要更新 */
                if (+NumberLiList[1].getAttribute('data-number') > 2) {
                    /* 第二个开始更新 */
                    for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        NumberLiList[i].innerText = i + 1;
                        NumberLiList[i].setAttribute('data-number', i + 1);
                    }
                }
                this.hiddenEllipse('.ellipsis-head');
                this.hiddenEllipse('.ellipsis-tail', false);
                this.addClass(NumberLiList[pageNumber - 1], 'page-active')
            }
            /* 两边都需要出现省略符号占位 */
            if (pageNumber > state.maxShowBtnCount && pageNumber < rEllipseSign) {
                /* 针对 maxShowBtnCount===1 的特殊处理 */
                this.hiddenEllipse('.ellipsis-head', pageNumber === 2 && state.maxShowBtnCount === 1)
                this.hiddenEllipse('.ellipsis-tail', false)
                /* 更新中间的numberPage */
                for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                    NumberLiList[i].innerText = pageNumber + (i - state.activePosition)
                    NumberLiList[i].setAttribute('data-number', pageNumber + (i - state.activePosition))
                }
                this.addClass(NumberLiList[state.activePosition], 'page-active')
            }
            /* 右边不需要出现省略符号占位 */
            if (pageNumber >= rEllipseSign) {
                this.hiddenEllipse('.ellipsis-tail');
                this.hiddenEllipse('.ellipsis-head', false);
                /* 更新numberPage的内容，先判断是否需要更新 */
                if (+NumberLiList[len - 2].getAttribute('data-number') < state.totalPageCount - 1) {
                    /* 从第二个开始更新 */
                    for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        NumberLiList[i].innerText = state.totalPageCount - (state.maxShowBtnCount - i) - 1;
                        NumberLiList[i].setAttribute('data-number', state.totalPageCount - (state.maxShowBtnCount - i) - 1)
                    }
                }
                /* 计算当前指定的页码
                 * 公式：(state.maxShowBtnCount + 1)表示右边无省略号时有多少个numberPage，
                 *      (state.totalPageCount - pageNumber) 表示当前active离最后有多远。
                */
                this.addClass(NumberLiList[(state.maxShowBtnCount + 1) - (state.totalPageCount - pageNumber)], 'page-active')
            }
        } else {
            /* 不需要省略符号占位 */
            this.addClass(NumberLiList[pageNumber - 1], 'page-active');
        }
        state.pageNumber = pageNumber;
        state.onPageChange && state.onPageChange(state);
        /* 判断 上一页 下一页 是否可使用 */
        this.switchPrevNextAble();
    }
    switchPrevNextAble() {
        let state = this.state;
        let prevBtn = this.selectorEle('.page-prev');
        let nextBtn = this.selectorEle('.page-next');
        /* 当前页已经是第一页，则禁止 上一页 按钮的可用性 */
        state.pageNumber > 1 ?
            (this.hasClass(prevBtn, 'no-prev') && this.removeClass(prevBtn, 'no-prev'))
            : (!this.hasClass(prevBtn, 'no-prev') && this.addClass(prevBtn, 'no-prev'));
        /* 当前页已经是最后一页，则禁止 下一页 按钮的可用性 */
        state.pageNumber >= state.totalPageCount ?
            (!this.hasClass(nextBtn, 'no-next') && this.addClass(nextBtn, 'no-next'))
            : (this.hasClass(nextBtn, 'no-next') && this.removeClass(nextBtn, 'no-next'))
    }
    /* 获取对应元素 */
    selectorEle(selector, all = false) {
        return all ? document.querySelectorAll(selector) : document.querySelector(selector)
    }
    /* 判断元素是否存在对应类名 */
    hasClass(eleObj, className) {
        return eleObj.classList.contains(className);
    }
    addClass(eleObj, className) {
        eleObj.classList.add(className);
    }
    /* 判断是否合法 */
    isIllegal(pageNumber) {
        let state = this.state;
        return (
            Math.ceil(pageNumber) !== pageNumber ||
            pageNumber > state.totalPageCount || pageNumber < 1 ||
            typeof pageNumber !== 'number' || pageNumber !== pageNumber
        )
    }
    /* 清除样式 */
    removeClass(eleObj, className) {
        if (this.hasClass(eleObj, className)) {
            eleObj.classList.remove(className);
        }
    }
    hiddenEllipse(selector, shouldHidden = true) {
        this.selectorEle(selector).style.display = shouldHidden ? 'none' : ''
    }
}