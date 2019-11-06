import * as React from "react";
import { RouteComponentProps } from "react-router";

import { AddVehicleTypeForm } from "../AddVehicleTypeForm/AddVehicleTypeForm";

import { Button } from "@material-ui/core";

import * as Style from "./AddVehicleType.css";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { ISupportedRoutes, IVehicleType, ICheckListItem } from "app/models";
import { ServicesCheckList } from "../ServicesCheckList/ServicesCheckList";
import { AddNewCheckListItemModal } from "../AddNewCheckListItemModal/AddNewCheckListItemModal";
import { VehicleTypesActions } from "app/actions";

export namespace AddVehicleType {
    export interface IProps extends RouteComponentProps<void> {
        vehicleTypesActions: VehicleTypesActions;
        checkListItems: ICheckListItem[];
    }
    export interface IState {
        openModal: boolean;
        vehicleType: IVehicleType;
        vehicleTypeError: boolean | undefined;
    }
}

export class AddVehicleType extends React.Component<AddVehicleType.IProps, AddVehicleType.IState> {
    constructor(props: AddVehicleType.IProps) {
        super(props);
        this.state = {
            openModal: false,
            vehicleType: {
                name: "",
                description: "",
            },
            vehicleTypeError: undefined,
        };
    }

    gotoVehicleTypes = () => {
        const { vehicleTypesActions } = this.props;
        this.props.history.push(ISupportedRoutes.HOME);
        vehicleTypesActions.revertAddVehicleType();
    };

    validation = (): boolean => {
        const {
            vehicleType: { name, description },
        } = this.state;
        let validation = true;
        if (!name || !description) {
            validation = false;
        }

        this.setState({
            vehicleTypeError: true,
        });
        return validation;
    };

    addNewVehicleType = () => {
        const { vehicleType } = this.state;
        const { vehicleTypesActions } = this.props;
        if (!this.validation()) return;
        vehicleTypesActions.addNewVehicleType(vehicleType);
    };

    renderRightPanel = (): JSX.Element => {
        return (
            <div>
                <Button variant="contained" size="medium" onClick={this.gotoVehicleTypes}>
                    CANCEL
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={this.addNewVehicleType}
                >
                    SAVE
                </Button>
            </div>
        );
    };

    handleChange = (vehicleType: IVehicleType) => {
        this.setState({
            vehicleType,
        });
    };

    render(): JSX.Element {
        const { vehicleTypeError } = this.state;
        const { checkListItems, vehicleTypesActions } = this.props;
        return (
            <div className={Style.AddVehicle}>
                <WidgetHeader
                    headerText={"Add New Vehicle Type"}
                    headerSmallText={"VEHICLE TYPES"}
                    rightPanel={this.renderRightPanel()}
                />
                <AddVehicleTypeForm
                    handleChange={this.handleChange}
                    vehicleType={this.state.vehicleType}
                    vehicleTypeError={vehicleTypeError}
                />
                <ServicesCheckList
                    handleOpenModal={() => this.setState({ openModal: true })}
                    checkListItems={checkListItems}
                    vehicleTypesActions={vehicleTypesActions}
                />
                <AddNewCheckListItemModal
                    vehicleTypesActions={vehicleTypesActions}
                    showModal={this.state.openModal}
                    handleClose={() => this.setState({ openModal: false })}
                    checkListItems={checkListItems}
                />
            </div>
        );
    }
}
