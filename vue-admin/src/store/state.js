/**
 * Created by Administrator on 2018/1/14 0014.
 * 公共状态模块
 */

//导入公共方法
import util from '../common/method/util.js'

const state = {
	language:util.toggleLanguage(),
	baiDuMapKey:'3GGKnVpSku9u2S17oalzlU6LmYHZoGLy',  //百度地图秘钥
	isCollapseSidebar:false
};

export default state;