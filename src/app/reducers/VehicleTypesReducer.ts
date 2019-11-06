import { handleActions } from "redux-actions";
import { IRootState } from "app/reducers";
import { VehicleTypesActions } from "app/actions";
import { IVehicleTypesModel, IVehicleTypeModel, ICheckListItem } from "app/models";
import { VehicleTypes } from "../constants/FakeVehicleData";

const initialState: IVehicleTypesModel = {
    vehicleTypesList: VehicleTypes,
    checkListItems: [],
};

// tslint:disable-next-line:typedef
export const vehicleTypesReducer = handleActions<
    IRootState.VehicleState,
    IVehicleTypesModel | IVehicleTypeModel[] | ICheckListItem[]
>(
    {
        [VehicleTypesActions.Type.REQUEST_ADD_VEHICLE_TYPE]: (
            state = initialState
        ): IRootState.VehicleState => ({
            ...state,
        }),
        [VehicleTypesActions.Type.RECEIVE_ADD_VEHICLE_TYPE]: (
            state = initialState,
            action
        ): IRootState.VehicleState => ({
            ...state,
            vehicleTypesList: action.payload as IVehicleTypeModel[],
            checkListItems: [],
        }),
        [VehicleTypesActions.Type.FAILURE_ADD_VEHICLE_TYPE]: (
            state = initialState
        ): IRootState.VehicleState => ({
            ...state,
        }),

        [VehicleTypesActions.Type.CANCEL_ADD_VEHICLE_TYPE]: (
            state = initialState
        ): IRootState.VehicleState => ({
            ...state,
            checkListItems: [],
        }),

        [VehicleTypesActions.Type.REQUEST_CHECK_LIST_ITEM]: (
            state = initialState
        ): IRootState.VehicleState => ({
            ...state,
        }),
        [VehicleTypesActions.Type.RECEIVE_CHECK_LIST_ITEM]: (
            state = initialState,
            action
        ): IRootState.VehicleState => ({
            ...state,
            checkListItems: action.payload as ICheckListItem[],
        }),
        [VehicleTypesActions.Type.FAILURE_CHECK_LIST_ITEM]: (
            state = initialState
        ): IRootState.VehicleState => ({
            ...state,
        }),

        [VehicleTypesActions.Type.DELETE_CHECK_LIST_ITEM]: (
            state = initialState,
            action
        ): IRootState.VehicleState => ({
            ...state,
            checkListItems: action.payload as ICheckListItem[],
        }),
    },
    initialState
);
