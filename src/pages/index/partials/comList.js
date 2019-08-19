import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'antd'
import com from '../com'
import style from '../index.css'
class ComponentList extends Component {
    render() {
        const {formItems,grid} = com;
        const keysFormItems = Object.keys(formItems);
        const gridItems = ['grid'];
        return (
            <div>
                <List
                    size="small"
                    dataSource={keysFormItems}
                    renderItem={item => <List.Item draggable
                                                   onDragStart={()=>this.props.dragStart(formItems[item])}
                                                   onDragEnd={()=>this.props.dragEnd(formItems[item])}
                    >{item}</List.Item>}
                />
                <List
                    dataSource={gridItems}
                    renderItem={item => <List.Item
                        draggable
                        onDragStart={()=>this.props.dragStart(grid)}
                        onDragEnd={()=>this.props.dragEnd(grid)}
                    >{item}</List.Item>}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state)
    return {};
}

export default connect(
    mapStateToProps,
)(ComponentList);
