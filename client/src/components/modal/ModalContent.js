import React from "react";
import PropTypes from "prop-types";
import "./ModalContent.css";

const ModalContent = ({ close }) => (
  <div className="Modal">
    <h2>This is a modal!</h2>

    <button className="CloseButton" onClick={close}>
      Close
    </button>
  </div>
);

ModalContent.propTypes = {
  close: PropTypes.func.isRequired
};

export default ModalContent;
