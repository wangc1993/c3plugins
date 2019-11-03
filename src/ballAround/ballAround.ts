import '../common/common.less';
import './ballAround.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="ring"></div>
    <div class="spheres">
        <span class="sphere"></span>
        <span class="sphere"></span>
        <span class="sphere"></span>
    </div>`;
    container.innerHTML = html;
}
