import { createSignal, onCleanup } from 'solid-js'
import logo from '../images/jh-logo-80.png'
// import { render } from 'solid-js/web'

import PagesTemplate from './menuList.jsx'

const HeaderTemplate = () => {
  const [menuToggle, setMenuToggle] = createSignal(false)

  const menuHandler = (data) => {
    setMenuToggle(!data)
  }

  return (
    <>
      <div id="jh-header">
        <button className="menu-button" onClick={() => menuHandler(menuToggle())}>
          <a className="menu-icon">☰</a>
        </button>
        <div id="jh-nav">
          <ul class={`pages${menuToggle() ? ' show' : ''}`}>
            <PagesTemplate />
          </ul>
        </div>
        <img className="logo" src={logo} alt="" />
        {/* <h1>Josh Hoegen &raquo; )'( &raquo; &#9835; &raquo; &hearts; &raquo;</h1> */}
        <h1>Josh Hoegen &raquo; &#9835; &hearts;</h1>
      </div>
      <div class="drawer"></div>
    </>
  )
}

export default HeaderTemplate
