import React from 'react';

export default () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>BringUp</strong> by{' '}
            <a href="http://medium.com/@yonjisan">Adham Kurniawan</a>. The
            source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            <a
              className="icon"
              href="https://github.com/adhamkurniawan/bringup"
            >
              <i className="fa fa-github fa-2x" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
