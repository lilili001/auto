export const  guid = function() { //获取随机ID，组件拖到预览视图后就会被设置个ID
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4()
}
export default guid



export function getFromLS() {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-7')) || null;
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls ;
}
export function saveToLS(obj) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-7',
            JSON.stringify({
                ...obj
            })
        );
    }
}
export function initialLayout() {
  return  [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
            i: i.toString(),
            x: i * 2,
            y: 0,
            w: 2,
            h: 2,
            add: i === (list.length - 1).toString()
        };
    })
}
