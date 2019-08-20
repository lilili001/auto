import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {WidthProvider,Responsive} from 'react-grid-layout'
import {getFromLS,saveToLS,initialLayout,guid ,formItemLayout,tailFormItemLayout } from '@/utils/index'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("rgl-7") ;
import { Alert, Form, Input, Button, Checkbox, Row, Col, message, Modal, Icon , Tabs  } from 'antd';
import Header from './partials/header'
import {onAddLayout, onAddItem, onLayoutChange, onRemoveItem} from "@/pages/index/actions/func";
import {createElement} from "@/pages/index/actions/createEle";
import ComponentList from './partials/comList';
import {stopPro} from "@/utils";
const { TabPane } = Tabs;

class Page extends Component {
    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        isDraggable:false,
        rowHeight: 30,
        compactType:false, //垂直方向任意位置都可以 默认自动顶部对齐
        preventCollision:false, //碰撞元素位置不移动
        breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        onLayoutChange: function() {},
        initialLayout: initialLayout(),
    };

    constructor(props, context) {
        super(props, context);
        this.state={
            activeKey:'2',
            currentLayoutIndex:0, //当前布局的index
            currentItem:null,//当前选中的对象
            //layouts: originalLayout || [ {'layout0': this.props.initialLayout ,newCounter: 0  , sortOrder:0 }]
            layouts: originalLayout || []
        };
        this.onAddLayout = this.onAddLayout.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.dropIntoLayout = this.dropIntoLayout.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.drop = this.drop.bind(this)
        this.dragEnter = this.dragEnter.bind(this)
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
    onAddItem = (type,pid)=> onAddItem(this,type,pid);
    createElement = (el,layoutIndex) => createElement(this, el,layoutIndex)
    onLayoutChange= (layout,layouts,index)=> onLayoutChange(this,layout,layouts,index);
    onRemoveItem = (layoutIndex,i) => onRemoveItem(this,layoutIndex,i);

    dragStart(obj){
        event.target.style.background = 'yellow';
        event.dataTransfer.setData('item',JSON.stringify(obj));
    }
    dragEnd(){
        event.target.style.background = 'white';
    }
    //目标 grid
    dragEnter(ev){
        var i = ev.target.getAttribute('i');
        var index = this.state.currentLayoutIndex
        var item = _.find(this.state.layouts[index]['layout'+index],{i});
        ev.preventDefault();
        stopPro(ev)
         if(ev.target){
             this.setState({currentItem: item})
         }
        ev.target.style.background = '#d7e6f3'
    }
    dragLeave(ev){
        ev.preventDefault();
        ev.target.style.background = '#fff'
    }
    drop(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var obj = JSON.parse(ev.dataTransfer.getData('item'));
        console.log(obj);
        ev.target.style.background = '#ddd';
        if(this.state.currentItem.type!=='grid'){
              message.error('禁止拖拽');
        }else{
            this.onAddItem(obj.type , this.state.currentItem.i ) ;
        }
    }
    //拖到大区域 layout中
    dragEnterLayout(ev){
        ev.preventDefault();
        ev.stopPropagation();
       // ev.target.style.background = '#ecf5ca';
    }
    dropIntoLayout(ev){
        ev.stopPropagation();
        ev.preventDefault();
        var obj = JSON.parse(ev.dataTransfer.getData('item'));
        if(obj.type!=='grid'){
            message.error('当前区域仅允许拖拽grid组件');
            ev.target.style.background = '#fff';
            return;
        }
        this.onAddItem('grid');
        ev.target.style.background = '#fff';
    }
    changeInput(ev){
        console.log('sdf')
        const {currentItem} = this.state;
        currentItem['attributes'][ev.target.name] = ev.target.value;
        this.setState({currentItem});

        //currentItem['slots'].length = [];
        if(ev.target.name=='column' && ev.target.value > 1 ){
            for(let i=0;i<ev.target.value;i++){
                this.onAddItem('grid' , this.state.currentItem.i ) ;
            }
        }
    }
    tabChange(index){
        console.log(index)
        this.setState({activeKey:index})
    }
    render() {
        var obj = this.state.currentItem ;
        if(!!obj){
            var keys = Object.keys(obj  )   ;
            if(obj['attributes']) keys = Object.keys(obj['attributes']);
            if(obj['info']) var infoKeys = Object.keys(obj['info']);
        }
        return (
            <div className="content">
                <Header></Header>

                <div className="columns">
                    <div className="column is-one-fifth" style={{borderRight:"1px solid #000","paddingLeft":"20px"}}>
                    <Tabs defaultActiveKey="2" activeKey={this.state.activeKey} onChange={this.tabChange} >
                        <TabPane tab="组件列表" key="1">
                             <ComponentList dragStart={this.dragStart} dragEnd={this.dragEnd}></ComponentList>
                        </TabPane>
                        <TabPane tab="当前组件配置" key="2">
                                <div><b>Info</b></div>
                                {!!infoKeys && infoKeys.map(key=>{
                                    const value = obj['info'][key];
                                    return (
                                        <div className="row" key={key} >
                                            <label htmlFor=""><span className="label60">{key}</span><input  disabled value={value}/></label>
                                        </div>
                                    )
                                }) }
                                <div><b>Attributes</b></div>
                                <Form {...formItemLayout}>
                                    {!!keys && keys.map(key=>{
                                        const value = obj['attributes'][key];
                                        return (
                                            <div className="row" key={key}>
                                                <label><span className="label60">{key}</span><input name={key} onChange={this.changeInput.bind(this)} value={value}/></label>
                                            </div>
                                        )
                                    }) }
                                </Form>
                        </TabPane>
                    </Tabs>
                    </div>

                    <div className="column">
                        <button onClick={this.onAddLayout}>添加layout</button>
                        {/*<button onClick={this.onAddItem}>Add Item</button>*/}
                        {this.state.layouts.length == 0 ?   ( <div className="color666">还没有布局, 请 先添加布局</div> ) :
                         _.map(this.state.layouts,(layout,index)=>{
                            const key = Object.keys(layout)[0];
                            const grids = _.filter(layout[key],item=> item.parentId==null)
                            return (
                                <div  onDragEnter={this.dragEnterLayout}
                                      onDragOver={this.dragEnterLayout}
                                      onDragLeave={this.dragLeave}
                                      onDrop={this.dropIntoLayout}
                                      key={key}
                                      className="wrapper"
                                >
                                <ResponsiveReactGridLayout
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
                                    {_.map(grids,(item)=> this.createElement(item,layout['sortOrder'])   ) }
                                </ResponsiveReactGridLayout>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {};
}
export default Form.create()(connect(
    mapStateToProps,
)(Page));
