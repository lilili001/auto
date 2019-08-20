import React from 'react'
import { Row, Col } from 'antd';

export function createElement(that, el, layoutIndex) {
    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
    };
    const setCurrentItem = function(ev,item){
        ev.preventDefault();
        ev.stopPropagation();
        if (el.attributes) {
            that.setState({currentItem: item});
        }
    };
   /* const getGridNodes = (gridSlots) => {
        if (gridSlots.length) {
            return gridSlots.map(id => {
                const orgLayouts = that.state.layouts[layoutIndex]['layout' + layoutIndex];
                var item = _.find(orgLayouts, {i: id});
                return (<Col span={24/gridSlots.length} className="grid-item" key={id} data-grid={item}>
                        <div className={that.state.currentItem && that.state.currentItem['i'] == id ? 'active' : ''}
                             key={id} id={id} item={JSON.stringify(item)} onDragEnter={that.dragEnter} onDragOver={that.dragEnter}
                             onDragLeave={that.dragLeave} onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,item)}>
                            {(<div className="text" >{id}</div>)}
                            <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, id)}>x</span>
                        </div>
                        {getGridNodes(item.slots)}
                    </Col>
                )
            })
        }
    };*/
    const getGridNodes=(gridSlots)=>{
        return gridSlots.map((slot)=>{
            const orgLayouts = that.state.layouts[layoutIndex]['layout' + layoutIndex];
            var item = _.find(orgLayouts, {i: slot});
            if(!!item && item.slots.length){
                return (<Col span={24/gridSlots.length} className="grid-item" key={slot} data-grid={item}>
                    <div className={that.state.currentItem && that.state.currentItem['i'] == slot ? 'active' : ''}
                         key={slot} id={slot} item={JSON.stringify(item)} onDragEnter={that.dragEnter} onDragOver={that.dragEnter}
                         onDragLeave={that.dragLeave} onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,item)}>
                        {(<div className="text" >{slot}</div>)}
                        <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, slot)}>x</span>
                        { item && item.slots ?  getGridNodes(item.slots) : ''}
                    </div>
                </Col>)
            }else{
                return (
                    <Col span={24/gridSlots.length} className="grid-item" key={slot} data-grid={item}>
                        <div className={that.state.currentItem && that.state.currentItem['i'] == slot ? 'active' : ''}
                             key={slot} id={slot} item={JSON.stringify(item)} onDragEnter={that.dragEnter} onDragOver={that.dragEnter}
                             onDragLeave={that.dragLeave} onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,item)}>
                            {(<div className="text" >{slot}</div>)}
                            <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, slot)}>x</span>
                        </div>
                    </Col>
                );
            }
        })
    };
    const i = el.add ? "+" : el.i;
    return <Row className={that.state.currentItem && that.state.currentItem['i'] == i ? 'active' : ''} key={i} id={i}
                        data-grid={el} onDragEnter={that.dragEnter} onDragOver={that.dragEnter} onDragLeave={that.dragLeave}
                        onDrop={that.drop} onClick={(ev)=>setCurrentItem(ev,el)}>
        { !!el ?  getGridNodes(el.slots) : ''}
        {/*{(<span className="text">{i}</span>)}*/}
        <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, i)}>x</span>
    </Row>
}

