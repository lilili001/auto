import React from 'react';

const Page = (props) => {
    var timer = setTimeout(()=>{
        props.history.push('/')
    },3000)

    return (
        <div>
            about
        </div>
    );
};

export default Page;
