import React from 'react';
import ReactDOM from 'react-dom';

import './error-alert.css';

// const ALERT_CLOSE_DELAY = 7000;

type ErrorAlertProps = {
  children: string;
};

const rootNode = document.getElementById('root');

function ErrorAlert(props: ErrorAlertProps): JSX.Element {
  const { children } = props;

  React.useEffect(() => {
    // setTimeout(handleCloseAlert, ALERT_CLOSE_DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div className="error-alert">
      <button className="error-alert__close-btn">
        x<span className="visually-hidden">Закрыть окно</span>
      </button>
      <p className="error-alert__message">{children}</p>
    </div>,
    rootNode as Element,
  );
}

export default ErrorAlert;
