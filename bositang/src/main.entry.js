import '../res/js/weui/weui.min.css';
import '../res/css/zlcg-style.css';
import '../res/css/common.css';
switch(window.location.pathname) {
    case '/pages/index.html':
        break;
    case '/pages/zlcg/regular.html':
     	require('../res/js/zlcg/regular.js');
        break;
    case '/pages/zlcg/info.html':
     	require('../res/js/zlcg/info.js');
        break;
   	case '/pages/zlcg/student-login.html':
     	require('../res/js/zlcg/student-login.js');
        break;
	case '/pages/zlcg/subject.html':
     	require('../res/js/zlcg/subject.js');
     	require('../node_modules/swiper/dist/css/swiper.min.css');
        break;
    case '/pages/zlcg/result.html':
     	require('../res/js/zlcg/result.js');
        break;
}