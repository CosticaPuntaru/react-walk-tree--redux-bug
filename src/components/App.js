import React from 'react'
// import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import First from './first';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <First></First>
        </div>
      </Provider>
    )
  }
}

export default App
