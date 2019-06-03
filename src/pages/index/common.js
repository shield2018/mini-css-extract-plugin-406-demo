import $ from 'jquery';
import module from '../../modules/module.js';
import './b.less';
function commonInit(){
    $(window);
    module();
    console.log('common');
}

export default commonInit;