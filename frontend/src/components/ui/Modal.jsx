import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './Modal.style.scss';

const portalElement = document.getElementById('overlays');

const Backdrop = (props) => {
  return <div onClick={props.onClose} className='backdrop'></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className='modal'>
      <div className='modal__content'>{props.children}</div>
    </div>
  );
};

function Modal(props) {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
