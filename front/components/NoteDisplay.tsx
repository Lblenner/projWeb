
export default function NoteDisplay(props) {
  return (
    <div>
      <div className="note">
        <div className="desc">
          {props.name}
        </div>
        <div className="value">
          {props.value}
        </div>
      </div>

      <style jsx>{`
          .note {
            height: 25px;
            width: 140px; 
            margin-right: 10px;
            display: flex;
            flex-direction: row;
          }
          .desc {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-growth: 1;
            width: 50%;
            background-color:  #ed3232;
            border-right: 0.5px solid;
          }
          .value {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-growth: 1;
            width: 50%;
            background-color:  #f58484;
          }
        `}</style>

    </div>
  );
}