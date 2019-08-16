export const  guid = function() { //获取随机ID，组件拖到预览视图后就会被设置个ID
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4()
}
export default guid



export function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}
export function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-7",
            JSON.stringify({
                [key]: value
            })
        );
    }
}