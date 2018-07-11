import './jquery.entry';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../res/css/common.less';
import '../res/css/style.less';
import '../pages/common/header';
import '../pages/common/footer';
import '../res/js/parking/scripts';
switch(window.location.pathname) {
	case '/index.html':
		break;
    case '/pages/main/home.html':
    	require('swiper/dist/css/swiper.min.css');
    	require('swiper/dist/js/swiper.min');
	    require('../res/js/parking/home');
        break;
    case '/pages/main/solution.html':
        break;
	case '/pages/main/business.html':
		break;
	case '/pages/main/cases.html':
		break;
	case '/pages/main/about.html':
		require('bootstrap/dist/js/bootstrap.min.js');
		break;
	case '/pages/main/download.html':
		break;
}