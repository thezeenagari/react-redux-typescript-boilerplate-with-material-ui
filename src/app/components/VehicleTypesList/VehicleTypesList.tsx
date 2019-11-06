import * as React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import * as classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import * as Style from "./VehicleTypesList.css";
import { IVehicleTypeModel } from "app/models";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#FAFAFA",
        color: "#607D8B",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        backgroundColor: "#FFFFFF",
        color: "#37474F",
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        h4: {
            padding: "10px 0",
        },
    },
    table: {
        maxWidth: "100%",
    },
}));

export namespace VehicleTypesList {
    export interface IProps {
        vehicleTypes: IVehicleTypeModel[];
    }
}

export const VehicleTypesList: React.SFC<VehicleTypesList.IProps> = ({ vehicleTypes }) => {
    const classes = useStyles();

    return (
        <Paper className={classNames(classes.root, Style.vehicleList)}>
            <Typography variant="h6" noWrap>
                All Types
            </Typography>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Added</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicleTypes.map((item: IVehicleTypeModel, index: number) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {item.name}
                            </StyledTableCell>
                            <StyledTableCell>{item.description}</StyledTableCell>
                            <StyledTableCell>{item.addedDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
