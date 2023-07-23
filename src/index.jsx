import { render } from 'solid-js/web'

import HeaderTemplate from './components/header.jsx'
import FeatureInteractiveArt from './components/features/interactive/index.jsx'

const App = () => {
  return (
    <>
      <HeaderTemplate></HeaderTemplate>
      <div id="jh-page">
        <FeatureInteractiveArt />
      </div>
    </>
  )
}

render(() => <App />, document.getElementById('content'))
