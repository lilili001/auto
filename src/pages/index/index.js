import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {WidthProvider,Responsive} from 'react-grid-layout'
import {getFromLS,saveToLS,initialLayout,guid ,formItemLayout,tailFormItemLayout } from '@/utils/index'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("rgl-7") ;
import { Alert, Form, Input, Button, Checkbox, Row, Col, message, Modal, Icon , Tabs } from 'antd';
import {onAddLayout, onAddItem, onLayoutChange, onRemoveItem} from "@/pages/index/actions/func";
import {createElement} from "@/pages/index/actions/createEle";
import ComponentList from './partials/comList';
const { TabPane } = Tabs;

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
            layouts: originalLayout || []
        };
        this.onAddLayout = this.onAddLayout.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }
    componentDidMount(){}
    //添加布局
    onAddLayout=()=> onAddLayout(this);
    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }
    onAddItem = (type)=> onAddItem(this,type);
    createElement = (el,layoutIndex) => createElement(this, el,layoutIndex)
    onLayoutChange= (layout,layouts,index)=> onLayoutChange(this,layout,layouts,index);
    onRemoveItem = (layoutIndex,i) => onRemoveItem(this,layoutIndex,i);

    dragStart(obj){
        event.target.style.background = '#f8f8f8';
        event.dataTransfer.setData('item',JSON.stringify(obj));
    }
    dragEnd(){
        event.target.style.background = 'white';
    }
    //目标container
    dragEnter(ev){
        ev.preventDefault();
        ev.target.style.background = '#d7e6f3'
    }
    dragLeave(ev){
        ev.target.style.background = '#fff'
    }
    drop(ev){
        ev.target.style.background = '#ddd';
        ev.preventDefault();
        var obj = JSON.parse(ev.dataTransfer.getData('item'));
        console.log(obj);
    }
    changeInput(ev){

    }
    tabChange(){}
    render() {
        var obj = this.state.currentItem ;
        if(!!obj){
            var keys = Object.keys(obj  )   ;
            if(obj['attributes']) keys = Object.keys(obj['attributes']);
            if(obj['info']) var infoKeys = Object.keys(obj['info']);
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
                    <div className="column is-one-fifth" style={{borderRight:"1px solid #000","paddingLeft":"20px"}}>
                    <Tabs defaultActiveKey="2" onChange={this.tabChange} >
                        <TabPane tab="组件列表" key="1">
                             <ComponentList dragStart={this.dragStart} dragEnd={this.dragEnd}></ComponentList>
                        </TabPane>
                        <TabPane tab="当前组件配置" key="2">
                                <div><b>Info</b></div>
                                {!!infoKeys && infoKeys.map(key=>{
                                    const value = obj[key];
                                    return (
                                        <div className="row" key={key} >
                                            <label htmlFor=""><span className="label60">{key}</span><input onChange={this.changeInput} value={value}/></label>
                                        </div>
                                    )
                                }) }
                                <div><b>Attributes</b></div>
                                <Form {...formItemLayout}>
                                    {!!keys && keys.map(key=>{
                                        const value = obj[key];
                                        return (
                                            <div className="row" key={key}>
                                                <label  htmlFor=""><span className="label60">{key}</span><input onChange={this.changeInput} value={value}/></label>
                                            </div>
                                        )
                                    }) }
                                </Form>
                        </TabPane>
                    </Tabs>
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
