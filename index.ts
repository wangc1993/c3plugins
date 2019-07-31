/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 20:29:21
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-07-27 19:59:35
 */
import './src/common/common.less';
import './index.less';
const PluginArr = [{
    plugin_title: 'turntable'
},{
    plugin_title: 'textslide'
},{
    plugin_title: 'textflow3d'
},{
    plugin_title: 'flowborder'
},{
    plugin_title: 'glossybutton'
},{
    plugin_title: 'batteryloading'
}]; 
/* 避免transition属性在页面加载时就运行一次 */
window.onload = function(){
    const inputDiv = document.getElementsByTagName('input')[0];
    inputDiv.setAttribute('style','transition: all 0.8s;');
    const searchDiv = document.getElementsByClassName('search')[0];
    searchDiv.setAttribute('style','transition: all 0.8s;');
    /* 动态生成列表 */
    const pluginsDiv = document.getElementsByClassName('plugins')[0];
    let pluginListHtml = '';
    for(let i=0;i<PluginArr.length;i++){
        pluginListHtml += `<div class="plugin"><a href="http://localhost:3001/${PluginArr[i].plugin_title}.html" target="_blank">${PluginArr[i].plugin_title}</a></div>`;
    }
    pluginsDiv.innerHTML = pluginListHtml;
    const searchListDiv = document.getElementsByClassName('search-list')[0]; 
    /* plugin_list对应搜索框下拉菜单 */
    let plugin_list = [];
    for (let i = 0; i < PluginArr.length; i++) {
        let plugin_title = PluginArr[i].plugin_title;
        let obj = {
            'plugin_title': plugin_title
        };
        plugin_list.push(obj);
    }
    /* 筛选符合搜索条件的插件 */
    let filteredList = [];
    /* 记录当前的hover索引 */
    let currentIndex: number = -1;
    /* 添加输入框事件 */
    inputDiv.addEventListener('keyup', generatePluginList);
    inputDiv.addEventListener('keydown', selectPlugin);
    inputDiv.addEventListener('blur', hidePluginList);
    function generatePluginList(event){
        const userInput = event.target.value;
        const currentKey: number = event.keyCode;
        /* 符合条件的插件片段，插入文档中 */
        let fragment = document.createDocumentFragment();
        if(currentKey !== 38 && currentKey !== 40 && currentKey !== 13){
            /* 判断输入框是否有输入 */
            if (userInput.length === 0) {
                searchListDiv.classList.add('hidden');
                return false;
            }
            /* 有新输入时返回初始值 */
            currentIndex = -1;
            /* 清空之前的下拉框 */
            searchListDiv.innerHTML = '';
            searchListDiv.classList.remove('hidden');
            filteredList = plugin_list.filter(function (arr) {
                return arr.plugin_title.includes(userInput);
            });
            /* 判断是否有符合条件的插件 */
            if (filteredList.length === 0) {
                let paragraph = document.createElement('p');
                paragraph.innerText = 'No app found';
                fragment.appendChild(paragraph);
            }else{
                for (let i = 0; i < filteredList.length; i++) {
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
                    let span = document.createElement('span');
                    span.innerText = filteredList[i].plugin_title;
                    paragraph.appendChild(span);
                    fragment.appendChild(paragraph);
                }
            }
            searchListDiv.appendChild(fragment);
        }
    }
    function selectPlugin(event){
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
            window.open( `http://localhost:3001/${inputDiv.value}.html`);
        }
        
    }
    function hidePluginList(){
        /* 清理输入框与隐藏下拉框 */
        inputDiv.value = '';
        searchListDiv.classList.add('hidden');
    }
    /* 清除元素指定类 */
    function removeClass(){
        for(let i=0; i<filteredList.length;i++){
            searchListDiv.children[i].classList.remove('hover');
        }
    }
    /* 将当前select的值添加到input中 */
    function selectToInput(){
        inputDiv.value = searchListDiv.children[currentIndex].firstChild.textContent;
    }
};
