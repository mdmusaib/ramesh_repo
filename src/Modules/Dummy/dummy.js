import React, { Component } from 'react';

class DummyPage extends Component {
    handleClick = () => {
        localStorage.removeItem('User');
        this.props.history.push('/login');
    }

    render() {
        return (
            <div onClick={this.handleClick}>Logout</div>
        )
    }
}

export default DummyPage;