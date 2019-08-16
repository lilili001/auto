import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {WidthProvider,Responsive} from 'react-grid-layout'
import {getFromLS,saveToLS,initialLayout} from '@/utils/index'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("rgl-7") ;
import { Alert, Form, Input, Button, Checkbox, Row, Col, message, Modal, Icon } from 'antd';

class Page extends Component {

    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 30,
        verticalCompact:false, //垂直方向任意位置都可以 默认自动顶部对齐
        preventCollision:true, //碰撞元素位置不移动
        breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        onLayoutChange: function() {},
        initialLayout:initialLayout()
    };

    constructor(props, context) {
        super(props, context);
        this.state={
            currentLayoutIndex:0,
            layouts: originalLayout || [ {'layout0': this.props.initialLayout ,newCounter: 0  , sortOrder:0 }]
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
        var newLayout = [ {['layout'+len]:this.props.initialLayout ,newCounter: 0  , sortOrder:len } ];
        var newLayouts = [ ...this.state.layouts,...newLayout];
        this.setState({layouts:newLayouts})
    }
    onLayoutChange(layout,layouts,index){
         const {newCounter,sortOrder} = this.state.layouts[index];
         const row = {['layout'+index ] : layout, newCounter ,sortOrder}
         this.resetLayouts(row,index);
         this.props.onLayoutChange(layout); // updates status display
    }
    resetLayouts(row,index){
        let oLayouts = this.state.layouts;
        oLayouts[index] = row;
        this.setState({layouts:oLayouts});
        saveToLS(oLayouts)
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
            <div key={i} data-grid={el}>
                {el.add ? (<span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>) : (<span className="text">{i}</span>)}
                <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, layoutIndex, i)}>x</span>
            </div>
        );
    }
    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        console.log(breakpoint,cols)
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }
    onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n");
        let layouts = this.state.layouts;
        var index = this.state.currentLayoutIndex;
        var oLayout = layouts[index]['layout'+index];
        var newCounter = layouts[index]['newCounter'] + 1;
        var layout = oLayout.concat({
            i: "n" + newCounter,
            x: (oLayout.length * 2) % (this.state.cols || 12),
            y: Math.floor(oLayout.length/6), // puts it at the bottom
            w: 2,
            h: 2
        });

        layouts[index] = { ['layout'+index]: layout , newCounter,sortOrder:index };

        this.setState(layouts);
    }
    onRemoveItem(layoutIndex,i) {
        console.log(layoutIndex)
        console.log("removing", i);
        const layouts = this.state.layouts;
        var olayout = layouts[layoutIndex]['layout'+layoutIndex];
        olayout = _.reject(olayout, { i: i });
        layouts[layoutIndex]['layout'+layoutIndex] = olayout;
        this.setState({layouts});
    }
    render() {
        return (
            <div className="content">
                <button onClick={this.onAddLayout}>添加layout</button>
                <button onClick={this.onAddItem}>Add Item</button>
                {_.map(this.state.layouts,(layout,index)=>{
                    const key = Object.keys(layout)[0];
                    console.log(key)
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
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Page);
