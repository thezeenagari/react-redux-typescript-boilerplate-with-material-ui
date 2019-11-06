export interface IVehicleTypesModel {
    vehicleTypesList: IVehicleTypeModel[];
    checkListItems: ICheckListItem[];
}

export interface IVehicleTypeModel {
    id: number;
    name: string;
    description: string;
    addedDate: string;
}

export interface IVehicleType {
    name: string;
    description: string;
}

export interface ICheckListItem {
    id: number;
    name: string;
}
