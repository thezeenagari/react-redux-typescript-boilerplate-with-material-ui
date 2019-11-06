import { Store, createStore, applyMiddleware, Action } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";
import { logger } from "app/middleware";
import { rootReducer } from "app/reducers";
import { IRootState } from "app/reducers/State";

const isProd: boolean = process.env.NODE_ENV === "production";

function updateStoreReducer(store: Store<any, Action<any>>) {
    if (module.hot) {
        module.hot.accept("app/reducers", () => {
            const nextReducer: any = require("app/reducers");
            store.replaceReducer(nextReducer);
        });
    }
}

const constructStore = (initialState: IRootState | undefined, middleware: any) =>
    createStore(rootReducer as any, initialState as any, middleware) as Store<IRootState>;

function constructMiddleware(history: History) {
    const middlewares: any[] = [routerMiddleware(history), thunk];
    if (!isProd) {
        middlewares.push(logger);
    }
    let middleware: any = applyMiddleware(...middlewares);
    if (!isProd) {
        middleware = composeWithDevTools(middleware);
    }
    return middleware;
}

export default function configureStore(
    history: History,
    initialState?: IRootState
): Store<IRootState> {
    const middleware = constructMiddleware(history);
    const store = constructStore(initialState, middleware);
    updateStoreReducer(store);
    return store;
}
