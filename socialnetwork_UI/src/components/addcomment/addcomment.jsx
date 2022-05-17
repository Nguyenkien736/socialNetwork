import { useEffect, useState } from "react";
import popupStyles from "./addcomment.css";
import PropTypes from "prop-types";
const Addcomment = (props) => {
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
       
        opacity: show ? "1" : "0"
      }}
      hidden= {!show}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>

       
        <div className={popupStyles.content}>{props.children}</div>
      </div>
    </div>
  );
};

Addcomment.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default Addcomment;

