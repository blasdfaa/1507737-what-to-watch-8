import { AuthorizationStatus } from '../../const';

type UserBlockProps = {
  authorizationStatus: string;
};

function UserBlock(props: UserBlockProps): JSX.Element {
  const { authorizationStatus = 'NO_AUTH' } = props;

  return (
    <ul className="user-block">
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" href="#!">
              Sign out
            </a>
          </li>
        </>
      ) : (
        <a href="sign-in.html" className="user-block__link">
          Sign in
        </a>
      )}
    </ul>
  );
}

export default UserBlock;
