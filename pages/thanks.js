import React from 'react';
import ThankYou from '../components/thanks';

export default class Thanks extends React.Component {
  static getInitialProps({ req: { body: { name } } }) {
    return { name };
  }
  render() {
    return <ThankYou name={this.props.name} />;
  }
}
