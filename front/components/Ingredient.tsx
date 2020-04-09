import React from 'react'
import {FaTimes} from "react-icons/fa"


type MyProps = { del: Function,};
type MyState = {};

export default class Ingredient extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="form-row" id="cont">
        <div className="col-1">
          <input required type="text" className="form-control" placeholder="0" />
        </div>
        <div className="col-1">
          <input required type="text" className="form-control" placeholder="cl" />
        </div>
        <div className="col">
          <input required type="text" className="form-control" placeholder="Tomate" />
        </div>
        <div className="col-1">
          <button type="button" className="form-control" onClick={() => this.props.del()}><FaTimes/></button>
        </div>

        <style jsx>{`
        #cont {
          margin-bottom: 10px
        }
        `}</style>
      </div>
    );
  }
}