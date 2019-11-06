import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import { ISupportedRoutes } from "./models";

import { AppLayout } from "app/components";
import VehicleTypes from "app/containers/VehicleTypesContainer";
import AddVehicle from "app/containers/AddVehicleContainer";

/**
 * Renders the Layout and component, passing props as new object.
 * @param Component A React Component
 */
const renderWithLayout: any = (Component: any) => (props: any) => (
    <AppLayout {...props}>
        <Component {...props} />
    </AppLayout>
);

/**
 * Switch managing routing throughout application.
 */
export const App = hot(module)(() => (
    <Switch>
        <Route exact path={ISupportedRoutes.HOME} component={renderWithLayout(VehicleTypes)} />
        <Route exact path={ISupportedRoutes.ADD_VEHICLE} component={renderWithLayout(AddVehicle)} />
    </Switch>
));
