import React from 'react'
export function createElement(that,el,layoutIndex) {
    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
        <div key={i} id={i} data-grid={el}>
            {el.add ? (<span className="add text" onClick={that.onAddItem} title="You can add an item by clicking here, too.">Add +</span>) : (<span className="text">{i}-{el.test}</span>)}
            <span className="remove" style={removeStyle} onClick={that.onRemoveItem.bind(that, layoutIndex, i)}>x</span>
        </div>
    );
}