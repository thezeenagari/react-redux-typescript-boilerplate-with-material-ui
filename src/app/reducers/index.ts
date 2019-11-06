export { IRootState, RouterState };
import { combineReducers, AnyAction, Reducer } from "redux";
import { routerReducer, RouterState } from "react-router-redux";
import { IRootState } from "app/reducers/State";
import { vehicleTypesReducer } from "app/reducers/VehicleTypesReducer";

// note: current type definition of Reducer in "react-router-redux" and "redux-actions" module
// doesn"t go well with redux@4
export const rootReducer: Reducer<IRootState, AnyAction> = combineReducers<IRootState>({
    vehicleTypes: vehicleTypesReducer as any,
    router: routerReducer as any,
});
