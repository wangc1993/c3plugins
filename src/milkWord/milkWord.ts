import '../common/common.less';
import './milkWord.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <p>Explorer</p>
    <p>Discovery</p>`;
    container.innerHTML = html;
}
