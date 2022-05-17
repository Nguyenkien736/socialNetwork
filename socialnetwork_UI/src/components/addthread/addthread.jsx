import { useEffect, useState } from "react";
import "./addthread.css";
import PropTypes from "prop-types";
const Addthread = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        
      }}
      hidden = {!show}
      className={'overlay'}
    >
      <div className={'popup'}>
        <h3>{props.title}</h3>
        <hr style={{width:'95%',opacity:'20%'}}></hr>

        <span className={'close'} onClick={closeHandler}>
          &times;
        </span>
        <div className={'content'}>{props.children}</div>
      </div>
    </div>
  );
};

Addthread.propTypes = {
  
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default Addthread;

