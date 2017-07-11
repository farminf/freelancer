import React from 'react';

function PanelWrapper(props) {
    
        return (
            <div className={props.size}>
                <div className='panel panel-info text-center' >
                    <div className=" panel-heading">
                        <h3 className="panel-title">{props.header}</h3>
                    </div>
                        {props.children}
                </div>
            </div>
        );
    
}

export default PanelWrapper;