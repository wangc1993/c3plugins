import '../common/common.less';
import './flickeringCandle.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <div class="candle">
        <span class="glow"></span>
        <span class="flames"></span>
        <span class="thread"></span>
    </div>`;
    container.innerHTML = html;
}
