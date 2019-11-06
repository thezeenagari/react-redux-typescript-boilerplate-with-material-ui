import { IVehicleTypesModel } from "app/models";
import { RouterState } from "react-router-redux";

export interface IRootState {
    router: RouterState;
    vehicleTypes: IRootState.VehicleState;
}

export namespace IRootState {
    export type VehicleState = IVehicleTypesModel;
}
