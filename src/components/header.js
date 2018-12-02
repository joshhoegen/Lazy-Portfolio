import dom, {Fragment} from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

import Pages from './pages'
class Header extends JSXComponent {
  menuClick() {
    const menu = document.querySelector('.pages')
    menu.classList.toggle('show')
  }
  render(props) {
    return (
      <div id="jh-header">
        <a class="menu-button" ref={super.ref} onClick={this.menuClick}><i class="fa fa-bars"></i></a>
        <div id="jh-nav">
          <ul class="pages">
            <Pages />
          </ul>
        </div>
        <img class="logo" src="../../assets/images/jh-logo-80.png" alt="Josh Hoegen" />
        <h1>Josh Hoegen &raquo; )'( &raquo; &#9835; &raquo; &hearts; &raquo;</h1>
      </div>
    )
  }
}

export default Header
