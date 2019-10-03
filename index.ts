/*
 * @Author: Carrey Wang
 * @Date: 2019-08-05 12:11:38
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-08-08 20:44:17
 */

import './src/common/common.less';
import './index.less';
import { highlightWords } from './src/util/utils';
import Message from './src/common/message/message';
import Pagination from './src/common/pagination/pagination';
/* 区分prod和dev环境 */
const BaseUrl: string = window.location.href.split('index')[0];
/* 所有插件 */
const PluginArr = [{
    plugin_title: 'turntable'
},{
    plugin_title: 'textslide'
},{
    plugin_title: 'textflow3d'
},{
    plugin_title: 'flowborder'
},{
    plugin_title: 'textslide2'
},{
    plugin_title: 'glossybutton'
},{
    plugin_title: 'batteryloading'
},{
    plugin_title: 'textAssertion'
},{
    plugin_title: 'hotcoffee'
},{
    plugin_title: 'concentricMatrix'
},{
    plugin_title: 'inverseFilling'
},{
    plugin_title: 'signboard'
},{
    plugin_title: 'strokeButton'
}];
// for(let i : number =0;i<200;i++){
//     PluginArr.push({plugin_title:`flow${i}`})
// }
/* 是否跳转的标志位 */
let jumpBool : boolean = false;
/* 避免transition属性在页面加载时就运行一次 */
window.onload = function() : void{
    const inputDiv: HTMLInputElement = document.getElementsByTagName('input')[0];
    inputDiv.setAttribute('style','transition: all 0.8s;');
    const searchDiv : Element  = document.getElementsByClassName('search')[0];
    searchDiv.setAttribute('style','transition: all 0.8s;');
    /* 动态生成插件列表 */
    const pluginsDiv : Element = document.getElementsByClassName('plugins')[0];
    /*每页多少个插件*/
    const perPageCount = 16;
    addPluginList();
    const searchListDiv : Element = document.getElementsByClassName('search-list')[0];
    /* 筛选符合搜索条件的插件 */
    let filteredList = [];
    /* 记录当前的hover索引 */
    let currentIndex: number = -1;
    /* 添加输入框事件 */
    inputDiv.addEventListener('keyup', generatePluginList);
    inputDiv.addEventListener('keydown', selectPlugin);
    inputDiv.addEventListener('blur', hidePluginList);
    function generatePluginList(event : any) : void{
        const userInput : string = event.target.value;
        const currentKey: number = event.keyCode;
        /* 符合条件的插件片段，插入文档中 */
        let fragment: DocumentFragment = document.createDocumentFragment();
        if(currentKey !== 38 && currentKey !== 40 && currentKey !== 13){
            /* 判断输入框是否有输入 */
            if (userInput.length === 0) {
                searchListDiv.classList.add('hidden');
                return;
            }
            /* 有新输入时返回初始值 */
            currentIndex = -1;
            /* 清空之前的下拉框 */
            searchListDiv.innerHTML = '';
            searchListDiv.classList.remove('hidden');
            filteredList = PluginArr.filter(function (arr) {
                return arr.plugin_title.includes(userInput);
            });
            /* 判断是否有符合条件的插件 */
            if (filteredList.length === 0) {
                let paragraph = document.createElement('p');
                paragraph.innerText = 'No app found';
                fragment.appendChild(paragraph);
            }else{
                /* 动态增加插件下拉框 */
                for (let i : number = 0; i < filteredList.length; i++) {
                    let paragraph = document.createElement('p');
                    paragraph.classList.add('search-p');
                    paragraph.addEventListener('mouseover',function(e){
                        removeClass();
                        paragraph.classList.add('hover');
                        currentIndex = i;
                    });
                    paragraph.addEventListener('mouseout',function(e){
                        if(currentIndex === i){
                            paragraph.classList.remove('hover');
                        }
                        currentIndex = -1;
                    });
                    paragraph.innerHTML = highlightWords(filteredList[i].plugin_title,userInput);
                    paragraph.addEventListener('click',function(){
                        window.open( `${BaseUrl}${filteredList[i].plugin_title}.html`);
                    });
                    fragment.appendChild(paragraph);
                }
            }
            searchListDiv.appendChild(fragment);
        }
    }
    /* 通过键盘控制插件的选择 */
    function selectPlugin(event : any) : void{
        const currentKey: number = event.keyCode;
        if(currentKey === 38){
            /* 向上键 */
            if(filteredList.length > 0){
                removeClass();
                if(currentIndex  !== -1){
                    currentIndex -= 1;
                    if(currentIndex !== -1){
                        searchListDiv.children[currentIndex].classList.add('hover');
                        selectToInput();
                    }
                }else{
                    currentIndex = filteredList.length -1 ;
                    searchListDiv.children[currentIndex].classList.add('hover');
                    selectToInput();
                }
            }
        }else if(currentKey === 40 ){
            /* 向下键 */
            if(filteredList.length > 0){
                removeClass();
                if(currentIndex < filteredList.length -1){
                    currentIndex += 1;
                    searchListDiv.children[currentIndex].classList.add('hover');
                    selectToInput();
                }else{
                    currentIndex = -1;
                }
            }
        }
        if(currentKey === 13){
            /* 回车搜索 */
            PluginArr.filter((item,index) => {
                if(item.plugin_title === inputDiv.value){
                    jumpBool = true;
                    window.open( `${BaseUrl}${inputDiv.value}.html`);
                }else{
                    if(index === PluginArr.length - 1 && !jumpBool){
                        let message = new Message({
                            message:`<div>不存在插件${inputDiv.value}，请重新输入！</div>`,
                            type:"info"
                        });
                        message.showModel();
                    }
                }
            });
            /* 重新赋值 */
            jumpBool = false;
        }
    }
    function hidePluginList() : void{
        /* 清理输入框与隐藏下拉框，定时器是为了让清除操作在页面跳转之后*/
        setTimeout(function(){
            inputDiv.value = '';
            searchListDiv.classList.add('hidden');
        },100);
    }
    /* 清除元素指定类 */
    function removeClass() : void{
        for(let i : number =0; i<filteredList.length;i++){
            searchListDiv.children[i].classList.remove('hover');
        }
    }
    /* 将当前select的值添加到input中 */
    function selectToInput() : void{
        //这边使用childNodes而不是children
        let children : NodeListOf<ChildNode> = searchListDiv.children[currentIndex].childNodes;
        let text = '';
        for(let i : number = 0; i<children.length; i++){
            text += children[i].textContent;
        }
        inputDiv.value = text;
    }
    /* 动态生成插件列表 */
    function addPluginList(pageNumber: number = 1,perpageCount: number = perPageCount) : void{
        let pluginListHtml : string = '';
        for(let i : number =(pageNumber - 1) * perpageCount;i<(pageNumber * perpageCount);i++){
            pluginListHtml += PluginArr[i] ? `<div class="plugin"><a class="multiLine-ellipse-1" href="${BaseUrl}${PluginArr[i].plugin_title}.html" target="_blank">${PluginArr[i].plugin_title}</a></div>` : '';
        }
        pluginsDiv.innerHTML = pluginListHtml;
    }
    let pagination: any = new Pagination({
        totalCount: PluginArr.length,
        container: '.pagination-div',
        perPageCount,
        onPageChange: function(data) : void{
            addPluginList(data.pageNumber,data.perPageCount);
        }
    });
};