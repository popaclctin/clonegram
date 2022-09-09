import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './Modal.style.scss';

const portalElement = document.getElementById('overlays');

const Backdrop = (props) => {
  return (
    <div onClick={props.onClose} className='backdrop'>
      {props.children}
    </div>
  );
};

const ModalOverlay = (props) => {
  return <div className='modal'>{props.children}</div>;
};

function Modal(props) {
  return createPortal(
    <Backdrop onClose={props.onClose}>
      <ModalOverlay>{props.children}</ModalOverlay>
    </Backdrop>,
    portalElement
  );
}

export default Modal;
