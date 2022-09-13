import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './Modal.style.scss';

const portalElement = document.getElementById('overlays');

const Backdrop = (props) => {
  return <div onClick={props.onClose} className='backdrop'></div>;
};

const ModalOverlay = (props) => {
  return <div className='modal'>{props.children}</div>;
};

function Modal({ children, onClose, root = portalElement }) {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={onClose} />, root)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, root)}
    </Fragment>
  );
}

export default Modal;
