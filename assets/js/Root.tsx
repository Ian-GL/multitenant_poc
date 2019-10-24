import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import InitialSetup from './pages/owner/InitialSetup';

export default class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/add-fields" component={InitialSetup} />
            <Route exact path="/owner-dashboard" component={Landing} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
};
