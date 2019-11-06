import * as React from "react";
import * as classNames from "classnames";
import { RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { VehicleTypesList } from "../VehicleTypesList/VehicleTypesList";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";

import { ISupportedRoutes, IVehicleTypeModel } from "app/models";

import * as Style from "./VehicleTypes.css";

export namespace VehicleTypes {
    export interface IProps extends RouteComponentProps<void> {
        vehicleTypes: IVehicleTypeModel[];
    }
    export interface IState {}
}

export class VehicleTypes extends React.Component<VehicleTypes.IProps, VehicleTypes.IState> {
    constructor(props: VehicleTypes.IProps) {
        super(props);
        this.state = {};
    }

    gotoAddVehicle = () => {
        this.props.history.push(ISupportedRoutes.ADD_VEHICLE);
    };

    renderRightPanel = (): JSX.Element => {
        return (
            <div>
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={this.gotoAddVehicle}
                >
                    <Add /> NEW TYPE
                </Button>
            </div>
        );
    };

    render(): JSX.Element {
        const { vehicleTypes } = this.props;
        return (
            <div className={classNames(Style.vehicle)}>
                <WidgetHeader
                    headerText={"Vehicle Types"}
                    headerSmallText={"GENERAL"}
                    rightPanel={this.renderRightPanel()}
                />
                <VehicleTypesList vehicleTypes={vehicleTypes} />
            </div>
        );
    }
}
