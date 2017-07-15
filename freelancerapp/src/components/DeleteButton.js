import React, { Component } from 'react';

class DeleteButton extends Component {

    onClick() {
        this.props.onClick(this.props.index)
    }
    render() {
        return (
            <button onClick={() => { this.onClick(this.props.projects) }}>X</button>
        );
    }
}

export default DeleteButton;