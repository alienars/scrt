interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header id="m_nav" className="dark:bg-gray-800 dark:text-gray-100">
      <div id="nav_txt">
        <span>SCRT</span>
      </div>
      <div className="container flex mx-auto justify-center">
        <a href="https://scrt.ra8.ir" aria-label="Back to homepage" className="flex items-center p-1">
          <img id="nav_ico" src="logo.png" />
        </a>
      </div>
    </header>
  );
};

export default Header;
