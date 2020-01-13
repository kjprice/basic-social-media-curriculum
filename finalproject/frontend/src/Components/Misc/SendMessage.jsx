import React, {Component} from "react";

export default class SendMessage extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    submit = () => {
        const {sendMessage} = this.props;
        const {body} = this.state;


        const message = {body};
        
        sendMessage(message);
    }

    textChange = (event) => {
        const text = event.target.value;
        this.setState({body: text});
    }

    render() {
        const { body } = this.state;

        return (
            <div>
                <textarea value={body} onChange={this.textChange} />
                <br/>
                <button type="button" onClick={this.submit} >Send Message</button>
            </div>
        );    
    }
}