import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {WidthProvider,Responsive} from 'react-grid-layout'
import {getFromLS,saveToLS,initialLayout,guid ,formItemLayout,tailFormItemLayout } from '@/utils/index'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("rgl-7") ;
import { Alert, Form, Input, Button, Checkbox, Row, Col, message, Modal, Icon } from 'antd';
class Page extends Component {

    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 30,
        compactType:false, //垂直方向任意位置都可以 默认自动顶部对齐
        preventCollision:true, //碰撞元素位置不移动
        breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        onLayoutChange: function() {},
        initialLayout: initialLayout(),
    };

    constructor(props, context) {
        super(props, context);
        this.state={
            currentLayoutIndex:0, //当前布局的index
            currentGridIndex:null, //当前grid 的 index
            currentItem:null,//当前选中的对象
            //layouts: originalLayout || [ {'layout0': this.props.initialLayout ,newCounter: 0  , sortOrder:0 }]
            layouts:[]
        };
        this.onAddLayout = this.onAddLayout.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }
    componentDidMount(){
        //console.log(this.state.currentLayoutId)
    }
    //添加布局
    onAddLayout(){
        const len = this.state.layouts.length;
        //var newLayout = [ {['layout'+len]:this.props.initialLayout ,newCounter: 0  , sortOrder:len } ];
        var newLayout = [ {['layout'+len]:[] ,newCounter: 0  , sortOrder:len } ];
        var newLayouts = [ ...this.state.layouts,...newLayout];
        this.setState({layouts:newLayouts , currentLayoutIndex:len });
    }

    //设置当前这个grid有设置信息
    onShowSettings(item){
        //this.setState({currentItem:item})
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }
    onAddItem(type) {
        //此处可根据类型来判断所要添加的组件属性
        /*eslint no-console: 0*/
        console.log("adding", "n");
        let layouts = this.state.layouts;
        var index = this.state.currentLayoutIndex;
        var oLayout = layouts[index]['layout'+index];
        var newCounter = layouts[index]['newCounter'] + 1;
        const uuid = guid();
        var layout = oLayout.concat({
            i:uuid,
            x: (oLayout.length * 2) % (this.state.cols || 12),
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
        this.setState({layouts,currentItem:layout[0]});
        saveToLS(layouts);
        return uuid
    }
    createElement(el,layoutIndex) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        const i = el.add ? "+" : el.i;
        return (
            <div key={i} id={i} data-grid={el} onClick={this.onShowSettings.bind(this,el)}>
                {el.add ? (<span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>) : (<span className="text">{i}-{el.test}</span>)}
                <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, layoutIndex, i)}>x</span>
            </div>
        );
    }
    onLayoutChange(layout,layouts,index){
        const {currentItem} = this.state;
        const laLayout = Object.assign({},currentItem,layout[0]);
        var orgLayouts = this.state.layouts;

        this.setState({currentItem: laLayout});
        this.onRemoveItem(index,layout.i,()=>{
            console.log(this.state.layouts)
        });

        saveToLS(this.state.layouts);
        //this.props.onLayoutChange(layout); // updates status display
    }
    resetLayouts(){
        saveToLS(this.state.layouts);
    }
    onRemoveItem(layoutIndex,i,cb) {
        const layouts = this.state.layouts;
        var olayout = layouts[layoutIndex]['layout'+layoutIndex];
        olayout = _.reject(olayout, { i: i });
        layouts[layoutIndex]['layout'+layoutIndex] = olayout;
        this.setState({layouts}, ()=> {
            cb && cb()
        });
    }
    render() {
        var obj = this.state.currentItem ;
        if(!!obj){
            var keys = Object.keys(obj);
        }

        return (
            <div className="content">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28"/>
                        </a>

                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                </nav>
                <div className="columns">
                    <div className="column is-one-fifth" style={{borderRight:"1px solid #000"}}>
                        <Form {...formItemLayout}>
                        {!!keys && keys.map(key=>{
                            const value = obj[key];
                            return (
                                    <Form.Item key={key} className="Item" label={key}><Input defaultValue={value}/></Form.Item>
                            )
                        }) }
                        </Form>
                    </div>
                    <div className="column">
                        <button onClick={this.onAddLayout}>添加layout</button>
                        <button onClick={this.onAddItem}>Add Item</button>
                        {_.map(this.state.layouts,(layout,index)=>{
                            const key = Object.keys(layout)[0];
                            return (
                                <ResponsiveReactGridLayout
                                    key={key}
                                    className="layout"
                                    {...this.props}
                                    compactType={'vertical'}
                                    onLayoutChange={(layout, layouts) =>{
                                        //this.setState({currentLayoutIndex:index});
                                        this.onLayoutChange(layout, layouts , index )
                                    }
                                    }
                                    onBreakpointChange={this.onBreakpointChange}
                                >
                                    {_.map(layout[key],(item)=>this.createElement(item,layout['sortOrder']) ) }
                                </ResponsiveReactGridLayout>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Page);
