import '../common/common.less';
import './panda.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="panda"></div>`;
    container.innerHTML = html;
}
