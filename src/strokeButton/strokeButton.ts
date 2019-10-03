import '../common/common.less';
import './strokeButton.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <nav>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>Contact</li>
        </ul>
    </nav>`;
    container.innerHTML = html;
}