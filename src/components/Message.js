import React, { useEffect, useState } from "react";
// CSS
import styles from "./styles/Message.module.css";
// Bootstrap
import Toast from "react-bootstrap/Toast";
// Contexts
import { useCurrentMessage, useSetCurrentMessage, useCurrentMessageType, useSetCurrentMessageType } from '../context/MessageContext.js';


const Message = () => {
  const currentMessage = useCurrentMessage();
  const setCurrentMessage = useSetCurrentMessage();
  const currentMessageType = useCurrentMessageType();
  const setCurrentMessageType = useSetCurrentMessageType();
  const [show, setShow] = useState(false);

  // Shows Message if exists, sets to null after timeout.
  useEffect(() => {
    let timer;
    if (currentMessage) {
      setShow(true);
      timer = setTimeout(() => {
        setShow();
        setCurrentMessage(null);
        setCurrentMessageType("alert")
      }, 6000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentMessage, setCurrentMessage, setCurrentMessageType]);

  if (currentMessage) {
    return (
        <Toast show={show} className={styles.Message}>
        {/* Message message */}
        <Toast.Body className={styles[`${currentMessageType}`]}>
          {currentMessage}
        </Toast.Body>
      </Toast>
    )
  }
};

export default Message;