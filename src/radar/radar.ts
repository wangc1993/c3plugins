import '../common/common.less';
import './radar.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="radar"></div>`;
    container.innerHTML = html;
}
