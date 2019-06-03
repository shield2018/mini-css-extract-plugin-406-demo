import $ from 'jquery';
import empty1 from './empty1';
import empty2 from './empty2';
import empty3 from './empty3';
function module(isMobile) {
    empty1();
    empty2();
    empty3();
    console.log($(window));
}
export default module;