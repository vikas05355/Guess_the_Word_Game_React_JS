import React, {Component} from 'react';
import * as firebase from "firebase";

class KeyPad extends Component {

    constructor() {
        super();
        this.state = {
            filledAnswerLength: 0,
            filledAnswer: [],
            keypad: [],
            changeColor: false,
            test: 1,
            level: 1,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let string = nextProps.data.keypad;
        string = string.split('').sort(function(){return (Math.random()%2 === 0)? true: false}).join('');
        string = string ? string.toUpperCase() : '';
        let keypad = [];
        for (let i = 0; i < string.length; i++)
            keypad.push({
                char: string[i],
                index: i
            });

        let ansArray = [];
        for (let i = 0; i < nextProps.data.ansSize; i++)
            ansArray.push({
                key: i,
                value: ''
            });
        this.setState({
            keypad: keypad,
            filledAnswerLength: nextProps.data.ansSize,
            filledAnswer: ansArray,
            level: nextProps.data.level
        });
    }

    ansListClickHandler = (event) => {
        let array = this.state.filledAnswer;
        if (!array[event].value) return;
        let keypad = this.state.keypad;
        keypad[array[event].key].char = array[event].value;
        array[event] = {key: event, value: '', disable: false};
        this.setState({filledAnswer: array, keypad: keypad, changeColor: 0});
    };

    wrongCodeAction() {
        let interval = setInterval(() => {
            this.setState({changeColor: this.state.changeColor ^ 1});
        }, 200);
        setTimeout(() => {
            clearInterval(interval);
            this.setState({changeColor: 1});
        }, 2000);
    }

    keypadClickHandler = (index) => {
        let keypad = this.state.keypad;
        let filledAnswer = this.state.filledAnswer;
        let filledAnswerIndex = 0;

        while (filledAnswerIndex < this.state.filledAnswerLength && filledAnswer[filledAnswerIndex].value)
            filledAnswerIndex++;

        if (filledAnswerIndex === this.state.filledAnswerLength) {
            this.wrongCodeAction();
            return;
        }

        filledAnswer[filledAnswerIndex] = {
            key: index,
            value: this.state.keypad[index].char
        };
        keypad[index].char = '';
        let count = 0;
        let ans = '';
        while (count < this.state.filledAnswerLength && filledAnswer[count].value) {
            ans += filledAnswer[count].value;
            count++;
        }

        if (count === this.state.filledAnswerLength) {
            let database = firebase.database().ref().child(`${this.state.level}-code`);
            database.on('value', snap => {
                let data = snap.val();
                if (data == ans)
                    this.props.nextLevel();
                else {
                    this.wrongCodeAction();
                }
            });
        }
        this.setState({keypad: keypad, filledAnswer: filledAnswer});
    };

    showAns=()=>{
        let database = firebase.database().ref().child(`${this.state.level}-code`);
        database.on('value', snap => {
            let data = snap.val();
            let array = this.state.filledAnswer;
            debugger
            for(let i=0;i<array.length;i++){
                array[i].value= data[i];
            }
             this.setState({filledAnswer: array});
            setTimeout(()=>{
                this.props.nextLevel();
            }, 1200);
        });
    };

    render() {
        let indents = [];
        for (let i = 0; i < this.state.filledAnswerLength; i++)
            indents.push(<span className={"answerBox" + (this.state.changeColor ? " redColor" : "")} key={i}
                               onClick={() => this.ansListClickHandler(i)}> {this.state.filledAnswer[i].value} </span>);

        let keypad = [];
        for (let i = 0; i < this.state.keypad.length; i++)
            if (this.state.keypad[i].char)
                keypad.push(<div className="emptyKeypad" key={i}
                                 onClick={() => this.keypadClickHandler(this.state.keypad[i].index)}> {this.state.keypad[i].char} </div>);
            else
                keypad.push(<div className=" emptyKeypad emptyKeypadBlur" key={i}> &nbsp; </div>);

        return (
            <div>
                <div className="filledAnswer">
                    {indents}
                </div>
                <br/>
                <div className="keypadContainer">
                    <div className="hintKeys">
                        {keypad}
                    </div>
                    <div >
                        <button className="hintButton" onClick={this.showAns}><div className="hintTitle"> A </div></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default KeyPad;
