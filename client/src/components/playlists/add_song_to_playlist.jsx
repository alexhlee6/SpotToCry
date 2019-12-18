import React from "react";
import PropTypes from "prop-types";
import "../modal/ModalContent.css";

const ModalContent = () => (
  <div className="Modal">
    <h2>Add song to playlist</h2>

  </div>
);

ModalContent.propTypes = {
  close: PropTypes.func.isRequired
};

export default ModalContent;

