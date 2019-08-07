import './message';
export default class Message {
    message: string;
    type: string;
    el:any;
    constructor(options){
        this.message = options.message || '我就提示一下！';
        this.type = options.type || "info";
        this.createElement();
    }
    createElement(){
        let message = document.createElement('div');
        message.className = 'message';
        message.innerHTML = `
        <div class="message-icon">
            <div class="message-icon-${this.type}"></div>
        </div>
        <div class="message-content"></div>
        `;
        /* 获取内容所属DOM */
        let content = message.querySelector(".message .message-content");
        /* 给message赋值 */
        content.innerHTML = this.message;
        this.el = message;
    }
    /* message显示 */
    showModel(){
        /* 把message的dom和遮罩插入到页面中 */
        document.body.appendChild(this.el);
        /* 动画显示 */
        setTimeout(() => {
            this.el.style.transform = "translate(-50%,-50%) scale(1,1)";
        },300);
        setTimeout(() => {
            this.closeModel();
        },3000);
    }
    /* message关闭 */
    closeModel(){
        /* 隐藏dom  */
        this.el.style.transform = "translate(-50%,-50%) scale(0,0)";
        /* 动画完成再移除 */
        setTimeout(() => {
            /* 把message移除 */
            document.body.removeChild(this.el);
        }, 300);
    }
}