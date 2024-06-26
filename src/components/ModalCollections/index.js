import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Modal.module.sass";
import Icon from "../Icon";

const ModalCollections = ({
  outerClassName,
  containerClassName,
  visible,
  onClose,
  children,
  title
}) => {
  // const escFunction = useCallback(
  //   (e) => {
  //     if (e.keyCode === 27) {
  //       onClose();
  //     }
  //   },
  //   [onClose]
  // );

  // useEffect(() => {
  //   document.addEventListener("keydown", escFunction, false);
  //   return () => {
  //     document.removeEventListener("keydown", escFunction, false);
  //   };
  // }, [escFunction]);

  const scrollRef = useRef(null);

  useEffect(() => {
    // visible ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
  }, [visible]);

  return createPortal(
    visible && (
      <div className={styles.modal} ref={scrollRef}>
        <div className={cn(styles.outer, outerClassName)}>
          {/* <OutsideClickHandler> */}
            <div className={cn(styles.container, containerClassName)}>
            <h1>{title}</h1>
              <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="14" />
              </button>
              {children}
            </div>
          {/* </OutsideClickHandler> */}
        </div>
      </div>
    ),
    document.body
  );
};

export default ModalCollections;
