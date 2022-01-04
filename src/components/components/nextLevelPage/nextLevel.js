import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

class NextLevel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            level: 2,
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({open: nextProps.open})
    }
    handleClose = () => {
        this.props.nextLevelClose();
    };

    render() {

        return (
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open } >
                    <div className="nextLevelContainer">
                        <div className="headingDiv">
                            <div className="correctHeading">CORRECT</div>
                        </div>
                        <div className="secDiv">
                            <div className="secTitle">You've guessed the word!</div>
                        </div>
                        <button onClick={this.handleClose} className="continueBtn">Continue</button>
                    </div>
                </Dialog>
        );
    }
}

export default NextLevel;
