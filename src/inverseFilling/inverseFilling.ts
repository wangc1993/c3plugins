import '../common/common.less';
import './inverseFilling.less';

window.onload = function() : void{
    let container = document.getElementsByClassName('container')[0];
    let html = `
    <nav>
        <ul>
            <li><span>Home</span></li>
            <li><span>Products</span></li>
            <li><span>Services</span></li>
            <li><span>Contact</span></li>
        </ul>
    </nav>`;
    container.innerHTML = html;
}