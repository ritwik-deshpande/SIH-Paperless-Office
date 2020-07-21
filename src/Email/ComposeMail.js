import React from 'react'

class ComposeMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            bcc: '',
            cc: '',
            subject: '',
            content: ''
        };
    }

    handleChange = (event) => {
        console.log(event.currentTarget.name)
        var field = event.currentTarget.name

        switch (field) {
            case 'from':
                this.setState({
                    from: event.target.value
                })
                break;
            case 'to':
                this.setState({
                    to: event.target.value
                })
                break
            case 'cc':
                this.setState({
                    cc: event.target.value
                })
                break
            case 'bcc':
                this.setState({
                    bcc: event.target.value
                })
                break;
            case 'subject':
                this.setState({
                    subject: event.target.value
                })
                break
            case 'content':
                this.setState({
                    content: event.target.value
                })
                break
            default:
                break;
        }

    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        // maybe do some api call
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    From:
            <input type="email" name='from' value={this.state.from} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    To:
            <input type="email" name='to' value={this.state.to} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    cc:
            <input type="email" name='cc' value={this.state.cc} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Bcc:
            <input type="email" name='bcc' value={this.state.bcc} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Subject:
            <input type="text" name='subject' value={this.state.subject} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Content:
            <input type="text" name='content' value={this.state.content} onChange={this.handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ComposeMail