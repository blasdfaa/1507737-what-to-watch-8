import React from 'react';

type MovieInfoProps = {
  children: React.ReactElement[];
};

function MovieInfoTabs({ children }: MovieInfoProps): JSX.Element {
  const DEFAULT_SELECTED_TAB = children[0].props.label as string;

  const [activeTab, setActiveTab] = React.useState<string>(DEFAULT_SELECTED_TAB);

  const tabItems = React.Children.map(
    children,
    (child: React.ReactElement) => child && (child.props.label as string),
  );

  const handleTabClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;

    if (target.textContent) {
      setActiveTab(target.textContent);
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabItems.map((tab) => (
            <li
              className={`film-nav__item ${activeTab === tab ? 'film-nav__item--active' : ''}`}
              key={`${tab}_info`}
            >
              <a href="!#" className="film-nav__link" onClick={handleTabClick}>
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children.map((child) => child.props.label === activeTab && child)}
    </>
  );
}

export default MovieInfoTabs;
