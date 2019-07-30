/*
 * @Author: Carrey Wang
 * @Date:   2019-07-27 21:01:33
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-07-27 21:05:47
 */
import './turntable.less';

/*转盘抽奖数据*/
const wards : string[] = [
    '1元', '2元', '3元', '5元', '再来一次','算法', '0.5元', '0.1元', '0.2元', '0.6元','0.5元', '谢谢'
];
/*生成从 start到end的随机数*/
function randomArr(start: number, end: number) {
    return Math.round(start + Math.random()* (end - start));
}
/*渲染dom，动态添加每个扇形*/
const fragment = document.createDocumentFragment();
for(let i:number=0, len = wards.length; i < len; i++) {
    let piece = document.createElement('div');
    piece.className = 'piece piece-' + i;
    piece.innerHTML = '<span>' + wards[i] + '</span>';
    fragment.appendChild(piece);
}
const eleTurntable= document.getElementsByClassName('turntable-background')[0];
eleTurntable.appendChild(fragment);



/*转动逻辑*/
const radis: number = 30;// 每个扇形区域的度数
const initRadis: number = 1080;// 初始转动的角度
const time:number = 5;// 转动时间(s)
let once: Boolean = true;  // 限制一个转动周期只能点击一次

document.getElementById('start').addEventListener('click', function(){
    const n:number = randomArr(0, 360/radis);// 计算随机中奖的位置
    const totalRadis:number =  initRadis + radis * n + radis/2;  // 转动角度计算公式
    if(once) {
        once = false;
        eleTurntable.setAttribute('style',`transform:rotate(${totalRadis}deg);transition: transform ${time}s cubic-bezier(0,.47,.31,1.03)`);
        setTimeout(function(){
            once = true;
            alert('恭喜你抽中了' + wards[n] + '!');
            /*返回原始状态*/
            eleTurntable.setAttribute('style',`transform:rotate(0deg);transition: none;`);
        }, time * 1000)
    }
    })
