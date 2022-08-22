import React, { Commponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

class Routes extends Commponent {
  commponentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default withRouter(Routes);
