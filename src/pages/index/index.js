import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {WidthProvider,Responsive} from 'react-grid-layout'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Page extends Component {
    onLayoutChange(layout){
        console.log(layout)
    }
    render() {
        const layouts = {"lg":[{"w":2,"h":3,"x":0,"y":0,"i":"1","minW":2,"minH":3,"moved":false,"static":false},{"w":2,"h":3,"x":2,"y":0,"i":"2","minW":2,"minH":3,"moved":false,"static":false},{"w":2,"h":3,"x":4,"y":0,"i":"3","minW":2,"minH":3,"moved":false,"static":false},{"w":2,"h":3,"x":6,"y":0,"i":"4","minW":2,"minH":3,"moved":false,"static":false},{"w":2,"h":3,"x":8,"y":0,"i":"5","minW":2,"minH":3,"moved":false,"static":false}]}
        return (
            <ResponsiveReactGridLayout
                className="layout"
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                layouts={layouts}
                onLayoutChange={(layout, layouts) =>
                    this.onLayoutChange(layout, layouts)
                }
            >
                <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">1</span>
                </div>
                <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">2</span>
                </div>
                <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">3</span>
                </div>
                <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">4</span>
                </div>
                <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
                    <span className="text">5</span>
                </div>
            </ResponsiveReactGridLayout>
        );
    }
}

function generateLayout() {
    return _.map(_.range(0, 25), function(item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            y: (_.random(0, 5) * 2) % 12,
            x: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Page);
