import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeStore2 } from '../store/store2';


class Second extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  bootstrap() {
    this.props.changeStore2('test2');
    console.log('bootstrap was called on second', this.props );
    return 'store2.value'
  }

  componentDidMount() {
    this.bootstrap();
  }

  render() {
    console.log('in render', this.props);
    if(!this.props.value){
      console.log(' returned because data was not loaded');
      return (<div>Loading</div>)
    }
    return (
      <div>
        value: {this.props.value}
      </div>
    )
  }
}

export default connect(({ store2 }) => {
  console.log('in connect', store2);
  return {
    value: store2.value
  }
}, { changeStore2 })(Second)
