type LoginAlertProps = {
  children: string;
};

function LoginAlert(props: LoginAlertProps): JSX.Element {
  const { children } = props;

  return (
    <div className="sign-in__message">
      <p>{children}</p>
    </div>
  );
}

export default LoginAlert;
