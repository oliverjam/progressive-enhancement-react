import React from 'react';
import Thanks from '../components/thanks';

export default class Index extends React.Component {
  state = {
    name: '',
    formState: 'initial',
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ formState: 'sending' });
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          isAjax: 'true',
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (res.status !== 200) return this.setState({ formState: 'error' });
      return this.setState({ formState: 'success' });
    } catch (error) {
      return this.setState({ formState: 'error' });
    }
  };
  render() {
    const { formState } = this.state;
    if (formState === 'initial' || formState === 'sending') {
      return (
        <form action="/submit" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={({ target }) => this.setState({ name: target.value })}
          />
          <input type="hidden" name="isAjax" value="false" />
          <button type="submit">
            {formState === 'sending' ? 'Sending...' : 'Submit'}
          </button>
        </form>
      );
    }
    if (formState === 'error') {
      return <h1>Oops</h1>;
    }
    if (formState === 'success') {
      return <Thanks name={this.state.name} />;
    }
    return <h1>How?</h1>;
  }
}
