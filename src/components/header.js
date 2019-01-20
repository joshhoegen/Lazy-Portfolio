import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

import Pages from './pages'

class Header extends JSXComponent {
  static menuClick() {
    const menu = document.querySelector('.pages')

    menu.classList.toggle('show')
  }

  render() {
    return (
      <div id="jh-header">
        <button className="menu-button" ref={super.ref} onClick={Header.menuClick}>
          <i className="fa fa-bars" />
        </button>
        <div id="jh-nav">
          <ul className="pages">
            <Pages />
          </ul>
        </div>
        <img className="logo" src="assets/images/jh-logo-80.png" alt="Josh Hoegen" />
        <h1>Josh Hoegen &raquo; )'( &raquo; &#9835; &raquo; &hearts; &raquo;</h1>
      </div>
    )
  }
}

export default Header
