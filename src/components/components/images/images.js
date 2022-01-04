import React, {Component} from 'react';
import '../../../assets/styles/main.css';

class Images extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images : []
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({images: nextProps.images})
  }

  render() {
    return (
        <>
          {this.state.images &&
          <div className="imagesContainer">
            <div>
              <div className="imagesBox">
                <img className="image" src={this.state.images[1]}/>
              </div>
              <br/>
              <div className="imagesBox">
                <img className="image" src={this.state.images[2]} />
              </div>
            </div>
            <div className="ml-20">
              <div className="imagesBox">
                <img className="image" src={this.state.images[3]}/>
              </div>
              <br/>
              <div className="imagesBox">
                <img className="image" src={this.state.images[4]}/>
              </div>
            </div>
          </div>}
          </>
    );
  }
}

export default Images;
