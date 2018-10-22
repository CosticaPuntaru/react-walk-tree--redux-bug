import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeStore1 } from '../store/store1';
import Second from './second'


class First extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  bootstrap() {
    this.props.changeStore1('test1');
    console.log('bootstrap was called', this.props );
    return 'store1.value'
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
        Second: <Second></Second>
      </div>
    )
  }
}

export default connect(({ store1 }) => {
  console.log('first component connect', store1);
  return {
    value: store1.value
  }
}, { changeStore1 })(First)
