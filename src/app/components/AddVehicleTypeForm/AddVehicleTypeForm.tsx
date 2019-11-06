import * as React from "react";

import { TextField, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as Style from "./AddVehicleTypeForm.css";
import { IVehicleType } from "app/models";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        padding: 15,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
}));

export namespace AddVehicleTypeForm {
    export interface IProps {
        handleChange: (vehicleType: IVehicleType) => void;
        vehicleType: IVehicleType;
        vehicleTypeError: boolean | undefined;
    }
}

export const AddVehicleTypeForm: React.SFC<AddVehicleTypeForm.IProps> = ({
    handleChange,
    vehicleType,
    vehicleTypeError,
}) => {
    const classes = useStyles();

    return (
        <div className={Style.addVehicleTypeForm}>
            <Typography variant="h6" noWrap>
                Info
            </Typography>
            <Divider />
            <form
                className={classes.container}
                autoComplete="off"
                onSubmit={() => console.log("okkk")}
            >
                <TextField
                    key={"name"}
                    error={!vehicleType.name && vehicleTypeError}
                    id="outlined-required"
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    helperText={
                        vehicleTypeError && !vehicleType.name
                            ? "Vehicle name is required!"
                            : "Use a short name, like 1 word."
                    }
                    onChange={e => handleChange({ ...vehicleType, name: e.target.value })}
                />
                <TextField
                    key={"description"}
                    error={!vehicleType.description && vehicleTypeError}
                    id="outlined-required"
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={e => handleChange({ ...vehicleType, description: e.target.value })}
                    helperText={
                        !vehicleType.description && vehicleTypeError
                            ? "Vehicle description is required!"
                            : undefined
                    }
                />
            </form>
        </div>
    );
};
