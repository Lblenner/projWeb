import React from 'react'
import { FaTimes } from "react-icons/fa"


type MyProps = { del: Function, id: number };
type MyState = {};

export default class Ingredient extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    var ret = <div className="col-1">
      <button type="button" className="form-control" onClick={() => this.props.del()}><FaTimes /></button>
    </div>

    if (this.props.id == 0) {
      ret = null
    }

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
        {ret}
        <style jsx>{`
        #cont {
          margin-bottom: 10px
        }
        `}</style>
      </div>
    );
  }
}