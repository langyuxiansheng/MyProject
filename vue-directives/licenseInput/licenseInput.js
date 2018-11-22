/**
 * 车牌输入选择
 */
let element = null;
export default {

    /**
     * 绑定时触发
     * @param {*} el
     * @param {*} binding
     * @param {*} vnode
     */
    bind(el, binding, vnode) {
        //设置dom的基本属性
        //获取焦点触发
        el.children[0].onfocus = function() {
            //防止重复创建
            if (document.getElementsByClassName('license-container').length === 0) {
                licenseInput(el, binding, vnode);
            }
        };
        element = el.children[0];
    },

    update(el, binding, vnode) {

    },

    unbind(el, binding) {
        console.log(el);
    }
};

//车牌号键盘
const licenseNumberModels = [`京`, `津`, `渝`, `冀`, `晋`, `吉`,
    `黒`, `浙`, `皖`, `籟`, `魯`, `豫`, `鄂`, `湘`, `粤`, `珎`, `川`, `貴`, `云`, `陜`, `甘`, `青`, `蒙`, `桂`, `守`, `新`, `藏`, `使`, `領`, `警`, `学`, `港`, `澳`
];
const AandZ = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const licenseInput = function(el, binding, vnode) {
    //创建定位容器
    let container = document.createElement('div');
    container.className = 'license-container';

    //创建关闭按钮
    let licenseBar = document.createElement('div');
    licenseBar.className = 'license-bar';
    let closeBtn = document.createElement('span');
    closeBtn.innerText = `关闭`;
    licenseBar.appendChild(closeBtn);
    container.appendChild(licenseBar);
    //点击关闭
    licenseBar.onclick = function() {
        container.remove();
    };

    //创建按钮容器
    let buttons = document.createElement(`div`);

    //创建文字按键
    for (let item in licenseNumberModels) {
        let btn = document.createElement(`span`);
        btn.onclick = handleClick;
        btn.innerHTML = licenseNumberModels[item];
        buttons.appendChild(btn);
    }
    buttons.className = 'license-buttons';
    container.appendChild(buttons);

    //创建A-Z
    buttons = document.createElement(`div`);
    for (let item in AandZ) {
        let btn = document.createElement(`span`);
        btn.onclick = handleClick;
        btn.innerHTML = AandZ[item];
        buttons.appendChild(btn);
    }
    buttons.className = 'license-buttons';
    container.appendChild(buttons);

    //创建0-9
    buttons = document.createElement(`div`);
    for (let item in numbers) {
        let btn = document.createElement(`span`);
        btn.onclick = handleClick;
        btn.innerHTML = numbers[item];
        buttons.appendChild(btn);
    }

    buttons.className = 'license-buttons';
    container.appendChild(buttons);
    el.appendChild(container);
};

/**
 * 处理点击事件
 * @param {*} e
 */
const handleClick = (e) => {
    let text = e.target.innerText;
    if (element) {
        element.value += text;
    }
};