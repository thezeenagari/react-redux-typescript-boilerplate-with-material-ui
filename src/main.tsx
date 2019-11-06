import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import { createBrowserHistory } from "history";
import { Store } from "redux";

import configureStore from "app/store";
import { App } from "app/App";

/** Prepare store */
const history = createBrowserHistory();
export const store: Store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App {...store.getState()} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
