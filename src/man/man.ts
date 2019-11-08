import '../common/common.less';
import './man.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="man">
        <span class="head"></span>
        <span class="body"></span>
        <span class="feet"></span>
    </div>`;
    container.innerHTML = html;
}
