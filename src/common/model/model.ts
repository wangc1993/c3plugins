export default class Model {
    content: string; //文办内容
    type: string; //信息类型
    showIcon: boolean; //是否展示弹窗图标
    confirm: Function; //确认后得回调
    cancle: Function; //取消后得回调
    footer: boolean; //是否显示底部的确认按钮
    header: boolean; //是否显示头部信息及关闭按钮
    title: string; //弹窗标题
    contentStyle: any; //内容样式
    contentFontSize: string; //内容字体大小
    btnName: string[]; //按钮文字内容  
    overlay  :any;
    el:any;
    constructor(options) {
        this.content = options.content || "";
        this.type = options.type || "info";
        this.showIcon = options.showIcon || true;
        this.confirm = options.confirm || null;
        this.cancle = options.cancle || null;
        this.footer = options.footer || true;
        this.header = options.header || true;
        this.title = options.title || "提示";
        this.contentStyle = options.contentStyle || {};
        this.contentFontSize = options.contentFontSize || "1.5em";
        this.btnName = options.btnName || ["确定", "取消"];
        this.createElement();
    };
    /* 创建弹窗元素 */
    createElement() {
        /* 创建最外层得包裹元素 */
        let wrap = document.createElement('div');
        wrap.className = 'model-wrap';
        /* 定义弹窗得两个按钮 */
        const [confirmBtnName, cancelBtnName] = this.btnName;
        /* 判断是否显示弹窗标题 */
        const headerHTML = this.header ? 
            `<div class="model-header">
                <span>${this.title}</span>
                <span class="model-header-close-button">×</span>
            </div>` : "";
        /* 判断是否显示图标 */
        const iconHTML = this.showIcon ?
            `<div class="model-body-icon">
                <div class="model-body-icon-${this.type}"></div>
            </div>` : "";
        /* 判断是否显示弹窗底部按钮 */
        const footerHTML = this.footer ?
            `<div class="model-footer">
                <button class="model-footer-btn model-footer-cancel-button">${cancelBtnName}</button>
                <button class="model-footer-btn model-footer-confirm-button">${confirmBtnName}</button>
            </div>` : "";
        /* 拼接完整的html */
        const innerHTML = `
            ${headerHTML}
            <div class="model-body">
                ${iconHTML}
                <div class="model-body-content"></div>
            </div>
            ${footerHTML}
        `;
        /* 将拼接的html赋值到wrap中 */
        wrap.innerHTML = innerHTML;
        /* 把自定义的样式进行合并 */
        const contentStyle = {
            fontSize: this.contentFontSize,
            ...this.contentStyle
        }
        /* 获取内容所属DOM */
        let content = wrap.querySelector(".model-body .model-body-content");
        /* 将传过来的样式添加到contentDOM */
        for (const key in contentStyle) {
            if (contentStyle.hasOwnProperty(key)) {
                content.setAttribute('style',`${key}: ${contentStyle[key]};`);
            }
        }
        /* 给弹窗的conntent赋值 */
        content.innerHTML = this.content;
        /* 创建遮罩层 */
        let overlay = document.createElement("div");
        overlay.className = "model-overlay";
        /* 把dom挂载到当前实例上 */
        this.overlay = overlay;
        this.el = wrap;
    }
    /* 弹窗显示 */
    showModel(){
        /* 把弹窗的dom和遮罩插入到页面中 */
        document.body.appendChild(this.el);
        document.body.appendChild(this.overlay);
        /* 将弹窗显示出来timeout进行异步处理显示动画 */
        setTimeout(() => {
            this.el.style.transform = "translate(-50%,-50%) scale(1,1)";
            this.overlay.style.opacity = "1";
        },100);
        this.bind();
    }
    /* 弹窗关闭 */
    closeModel(){
        /* 隐藏dom  */
        this.el.style.transform = "translate(-50%,-50%) scale(0,0)";
        this.overlay.style.opcity = "0";
        /* 动画完成再移除 */
        setTimeout(() => {
            /* 把弹窗的dom和遮罩移除 */
            document.body.removeChild(this.el);
            document.body.removeChild(this.overlay);
        }, 300);
    }
    /* 弹窗确认 */
    confirmModel(e){
        this.confirm && this.confirm.call(this, e);
        this.closeModel();
    }
    /* 弹窗取消 */
    cancleModel(){
        this.cancle();
        this.closeModel();
    }
    /* 事件绑定 */
    bind(){
        let that = this;
        /* 顶部关闭按钮绑定事件 */
        if (that.header) {
            that.el.querySelector(".model-header-close-button").addEventListener("click", function(){
                that.cancleModel();
            });
        }
        /* 弹窗底部两个按钮事件监听 */
        if (that.footer) {
            that.el.querySelector(".model-footer-cancel-button").addEventListener("click", function(){
                that.cancleModel();
            });
            that.el.querySelector(".model-footer-confirm-button").addEventListener("click", function(){
                that.confirm();
                that.closeModel();
            })
        }
    }
}