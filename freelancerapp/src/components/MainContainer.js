import React, { Component } from 'react';

function MainContainer(props) {
    
        return (
            <div className="col-sm-12 text-center" >
                {props.children}
            </div>
        );
    
}

export default MainContainer;