import '../common/common.less';
import './turnPage.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="book">
            <div class="page">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
     </div>`;
    container.innerHTML = html;
}
