import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'antd'
import com from '../com'
import style from  '../index.css'
console.log(style)
class ComponentList extends Component {
    render() {
        const {formItems,grid} = com;
        const keysFormItems = Object.keys(formItems);
        const gridItems = ['grid'];
        return (
            <div  className={style.list}>
                <List
                    size="small"
                    dataSource={keysFormItems}
                    renderItem={item => <List.Item >{item}</List.Item>}
                />
                <List

                    dataSource={gridItems}
                    renderItem={item => <List.Item >{item}</List.Item>}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {};
}

export default connect(
    mapStateToProps,
)(ComponentList);
