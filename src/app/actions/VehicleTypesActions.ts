import { createAction } from "redux-actions";
import { Dispatch } from "redux";
import { push } from "react-router-redux";

import * as moment from "moment";

import { IRootState } from "app/reducers/State";

import { IVehicleType, IVehicleTypeModel, ISupportedRoutes, ICheckListItem } from "app/models";

export namespace VehicleTypesActions {
    export enum Type {
        REQUEST_ADD_VEHICLE_TYPE = "REQUEST_ADD_VEHICLE_TYPE",
        RECEIVE_ADD_VEHICLE_TYPE = "RECEIVE_ADD_VEHICLE_TYPE",
        FAILURE_ADD_VEHICLE_TYPE = "FAILURE_ADD_VEHICLE_TYPE",

        CANCEL_ADD_VEHICLE_TYPE = "CANCEL_ADD_VEHICLE_TYPE",

        REQUEST_CHECK_LIST_ITEM = "REQUEST_CHECK_LIST_ITEM",
        RECEIVE_CHECK_LIST_ITEM = "RECEIVE_CHECK_LIST_ITEM",
        FAILURE_CHECK_LIST_ITEM = "FAILURE_CHECK_LIST_ITEM",

        DELETE_CHECK_LIST_ITEM = "DELETE_CHECK_LIST_ITEM",
    }

    // tslint:disable:typedef

    export const requestAddVehicleType = createAction(Type.REQUEST_ADD_VEHICLE_TYPE);
    export const receiveAddVehicleType = createAction<IVehicleTypeModel[]>(
        Type.RECEIVE_ADD_VEHICLE_TYPE
    );
    export const failureAddVehicleType = createAction(Type.FAILURE_ADD_VEHICLE_TYPE);

    export const cancelAddVehicleType = createAction(Type.CANCEL_ADD_VEHICLE_TYPE);

    export const requestCheckListitem = createAction(Type.REQUEST_CHECK_LIST_ITEM);
    export const receiveCheckListitem = createAction<ICheckListItem[]>(
        Type.RECEIVE_CHECK_LIST_ITEM
    );
    export const failureCheckListitem = createAction(Type.FAILURE_CHECK_LIST_ITEM);

    export const deleteCheckListItem = createAction<ICheckListItem[]>(Type.DELETE_CHECK_LIST_ITEM);

    export const addNewVehicleType = (vehicleType: IVehicleType) => {
        return async (dispatch: Dispatch, getState: () => IRootState) => {
            const { vehicleTypesList } = getState().vehicleTypes;
            let vehicleTypesListState = [...vehicleTypesList];
            dispatch(requestAddVehicleType());
            try {
                const newVehicleType: IVehicleTypeModel = {
                    ...vehicleType,
                    id: Math.floor(Math.random() * 100),
                    addedDate: moment().format("Mo MMM") + " at " + moment().format("h:mm a"),
                };
                vehicleTypesListState.push(newVehicleType);
                dispatch(receiveAddVehicleType(vehicleTypesListState));
                dispatch(push(ISupportedRoutes.HOME));
            } catch (e) {
                dispatch(failureAddVehicleType());
            }
        };
    };

    export const addCheckListItem = (checkListItems: ICheckListItem[]) => {
        return async (dispatch: Dispatch) => {
            dispatch(requestCheckListitem());
            try {
                dispatch(receiveCheckListitem(checkListItems));
            } catch (e) {
                dispatch(failureCheckListitem());
            }
        };
    };

    export const removeCheckListItem = (id: number) => {
        return (dispatch: Dispatch, getState: () => IRootState) => {
            const { checkListItems } = getState().vehicleTypes;
            let checkListItemsState = [...checkListItems];
            const index = checkListItemsState.findIndex(i => i.id === id);
            checkListItemsState.splice(index, 1);
            dispatch(deleteCheckListItem(checkListItemsState));
        };
    };

    export const revertAddVehicleType = () => {
        return (dispatch: Dispatch) => {
            dispatch(cancelAddVehicleType());
        };
    };
}

export type VehicleTypesActions = Omit<typeof VehicleTypesActions, "Type">;
