import {guid, saveToLS} from "@/utils/index";

export function onAddLayout(that){
    const len = that.state.layouts.length;
    var newLayout = [ {['layout'+len]:[] ,newCounter: 0  , sortOrder:len } ];
    var newLayouts = [ ...that.state.layouts,...newLayout];
    that.setState({layouts:newLayouts , currentLayoutIndex:len });
}

export function onAddItem(that ,type) {
    //此处可根据类型来判断所要添加的组件属性
    /*eslint no-console: 0*/
    console.log("adding", "n");
    let layouts = that.state.layouts;
    var index = that.state.currentLayoutIndex;
    var oLayout = layouts[index]['layout'+index];
    var newCounter = layouts[index]['newCounter'] + 1;
    const uuid = guid();
    var layout = oLayout.concat({
        i:uuid,
        x: (oLayout.length * 2) % (that.state.cols || 12),
        y: Math.floor(oLayout.length/6), // puts it at the bottom
        w: 2,
        h: 2,
        test:'test'+uuid,
        column:0,
        attributes:{

        },
        slots:'',
        info:{
            i: "n" + newCounter,
            isTarget:true,//是否能拖组件进来 初始化为true, 但是如果column>0的话 就不可以拖拽组件进来, 他的子组件也是grid,但是没有位置属性
        }
    });
    layouts[index] = { ['layout'+index]: layout , newCounter,sortOrder:index };
    that.setState({layouts,currentItem:layout[0]});
    saveToLS(layouts);
    return uuid
}
export function  onRemoveItem(that,layoutIndex,i) {
    const layouts = that.state.layouts;
    var olayout = layouts[layoutIndex]['layout'+layoutIndex];
    olayout = _.reject(olayout, { i: i });
    layouts[layoutIndex]['newCounter']--;
    layouts[layoutIndex]['layout'+layoutIndex] = olayout;
    that.setState({layouts,currentItem:null});
} 
export function onLayoutChange(that,layout,layouts,index){
    if(event==null) return;
    if(layout.length == 0   ) return;
    const {currentItem} = that.state;

    const laLayout = Object.assign({},currentItem,layout[0]);
    var orgLayouts = that.state.layouts;
    that.setState({currentItem: laLayout});

    //更新 layouts
    const layoutArr = orgLayouts[index]['layout'+index];
    let laIndex = _.findIndex(layoutArr, {i:laLayout.i});
    orgLayouts[index]['layout'+index][laIndex] = laLayout;
    saveToLS(that.state.layouts);
    //that.props.onLayoutChange(layout); // updates status display
} 