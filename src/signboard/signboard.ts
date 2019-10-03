import '../common/common.less';
import './signboard.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="signboard">
        <div class="sign">THANKS</div>
        <div class="strings"></div>
        <div class="pin top"></div>
        <div class="pin left"></div>
        <div class="pin right"></div>
    </div>`;
    container.innerHTML = html;
}