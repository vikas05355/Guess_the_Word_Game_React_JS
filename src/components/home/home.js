import React, {Component} from 'react';
import Images from '../components/images/images';
import KeyPad from '../components/keyPad/keyPad';
import NextLevel from "../components/nextLevelPage/nextLevel";
import * as firebase from "firebase";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            level: 1,
            data: [],
            nextLevelDialogOpen: false
        };
        this.nextLevel(1);
    }

    nextLevel = (status) => {
        if (!status) return;
        let database = firebase.database().ref().child(status);
        database.on('value', snap => {
            let data = snap.val();
            let level = status;
            if (data) this.setState({level: level + 1, data: {...data, level: level}});
        });
    };

    levelComplete = () =>{
        this.setState({nextLevelDialogOpen: true});
    };

    goToNextLevel = () => {
        this.nextLevel(this.state.level);
        this.setState({nextLevelDialogOpen: false});
    };
    render() {
        return (
            <div className="homeContainer">
                <Images images={this.state.data.image}/>
                <KeyPad data={this.state.data} nextLevel={this.levelComplete}/>
                <NextLevel nextLevelClose={this.goToNextLevel} open={this.state.nextLevelDialogOpen}/>
            </div>
        );
    }
}

export default Home;
