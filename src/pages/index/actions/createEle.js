import React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {stopPro} from "@/utils";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
 export function createElement(that, el, layoutIndex) {
    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
    };
    const setCurrentItem = function(ev,item){
        that.tabChange('2')
        ev.preventDefault();
        stopPro(ev);
        if (el.attributes) {
            that.setState({currentItem: item});
        }
    };
    document.onkeyup = ()=>{
        if(that.state.currentItem==null) return;
        const slot = that.state.currentItem.i;
        event.preventDefault();
        if(event.keyCode==8){
            console.log('退格键',slot);
            that.onRemoveItem(layoutIndex, slot)
        }
    }

    const onFocus = ev=>{
        stopPro(ev);
    }

    const onchange = (ev)=>{
        stopPro(ev);
     }
     const { getFieldDecorator } = that.props.form;
    const draggable = false;
    const getGridNodes=(gridSlots)=>{
        return gridSlots.map((slot)=>{
            const orgLayouts = that.state.layouts[layoutIndex]['layout' + layoutIndex];
            var item = _.find(orgLayouts, {i: slot});
            var dom;
            switch (item.type){
                case 'grid':
                    dom = (<Col xs={{ span: 12, offset:0 }} lg={{ span: 8, offset: 0 }} className="grid-item" key={slot} data-grid={item}>
                        <div className={that.state.currentItem && that.state.currentItem['i'] == slot ? 'active' : ''}
                             i={slot}
                             key={slot} id={slot}  onDragEnter={that.dragEnter} onDragOver={that.dragEnter}
                             onDragLeave={that.dragLeave} onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,item)}>
                            {(<div className="grid" i={slot}> { item && item.slots.length ? item.attributes['isForm'] ? <Form>{getGridNodes(item.slots)}</Form> : getGridNodes(item.slots) : ''} </div>)}
                           {/* <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, slot)}>x</span>*/}

                        </div>
                    </Col>);
                    break;
                case 'input':
                    dom = <Col xs={{ span: 12, offset:0 }} lg={{ span: 8, offset: 0 }} className={that.state.currentItem && that.state.currentItem['i'] == slot ? 'active' : ''}
                               key={slot} id={slot} item={JSON.stringify(item)}
                               data-grid={item}
                               onClick={(ev)=>setCurrentItem(ev,item)}
                    >
                                <Form.Item label={item.attributes.label} {...formItemLayout} >
                                    {getFieldDecorator( item.attributes.key || 'default' , {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })(<Input onFocus={onFocus} onChange={onchange}/>)}
                                </Form.Item>
                        {/*<span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, slot)}>x</span>*/}
                    </Col>;
                    break;
            }
            return dom;
        })
    };
    const i = el.add ? "+" : el.i;
    return <Row className={that.state.currentItem && that.state.currentItem['i'] == i ? 'active' : ''} key={i} id={i}
                i={i}
                        data-grid={el} onDragEnter={that.dragEnter} onDragOver={that.dragEnter} onDragLeave={that.dragLeave}
                        onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,el)}>
        { !!el ?  getGridNodes(el.slots) : ''}
        {/*{(<span className="text">{i}</span>)}*/}
        {/*<span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, i)}>x</span>*/}
    </Row>
}
