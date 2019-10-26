import '../common/common.less';
import './bounceButton.less';

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
