import React, { Component } from 'react';
import '../style.css';

class SendMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render() { 
        return (
            <form 
                onSubmit={this.handleSubmit}
                className='send-message-form'>
                <input 
                    onChange={this.handleChange}
                    value={this.state.message}
                    type='text' 
                    placeholder='Type your message and hit ENTER' />
            </form>
        );
    }
}
 
export default SendMessageForm;