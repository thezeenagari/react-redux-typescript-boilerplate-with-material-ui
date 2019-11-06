import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ListItemIcon } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { VehicleTypesActions } from "app/actions";
import { ICheckListItem } from "app/models";

import * as Style from "./AddNewCheckListItemModal.css";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textFieldWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));

export interface ITranslation {
    id: number;
    language: string;
}

export namespace AddNewCheckListItemModal {
    export interface IProps {
        showModal: boolean;
        handleClose: () => void;
        vehicleTypesActions: VehicleTypesActions;
        checkListItems: ICheckListItem[];
    }
}

export const AddNewCheckListItemModal: React.SFC<AddNewCheckListItemModal.IProps> = ({
    showModal,
    handleClose,
    checkListItems,
    vehicleTypesActions,
}) => {
    const classes = useStyles();
    const [name, setName] = React.useState("");
    const [validationError, setValidationError] = React.useState(false);
    const [translation, setTranslation] = React.useState<ITranslation[]>([]);

    const addNewCheckListItem = () => {
        if (!name) {
            setValidationError(true);
            return;
        }
        let checkListItemsState: ICheckListItem[] = [...checkListItems];
        checkListItemsState.push({ name, id: Math.floor(Math.random() * 100) });
        vehicleTypesActions.addCheckListItem(checkListItemsState);
        closeModal();
    };

    const closeModal = () => {
        handleClose();
        setName("");
        setValidationError(false);
        setTranslation([]);
    };

    const handleDelete = (id: number) => {
        const newTranslation = translation.filter(item => item.id !== id);
        setTranslation(newTranslation);
    };

    const handleAddTransaltion = (e: any) => {
        const value = e.target.value;
        if (translation.find((i: ITranslation) => i.language === value)) return;
        let newTranslation: ITranslation[] = [...translation];
        newTranslation.push({ id: Math.floor(Math.random() * 10), language: value });
        setTranslation(newTranslation);
    };
    return (
        <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Checklist Item</DialogTitle>
            <DialogContent style={{ width: "500px", minHeight: "400px" }}>
                <TextField
                    margin="normal"
                    id="name"
                    label="Name in English"
                    type="email"
                    value={name}
                    fullWidth
                    error={name === "" && validationError}
                    variant="outlined"
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    helperText={validationError && !name ? "Name is required!" : undefined}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Add translation</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleAddTransaltion}
                    >
                        <MenuItem value={"french"}>French</MenuItem>
                        <MenuItem value={"german"}>German</MenuItem>
                        <MenuItem value={"greek"}>Greek</MenuItem>
                        <MenuItem value={"italian"}>Italian</MenuItem>
                        <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                    </Select>
                </FormControl>
                {translation.map((item: ITranslation, index) => {
                    return (
                        <div className={classes.textFieldWrapper}>
                            <TextField
                                key={index}
                                margin="normal"
                                id="name"
                                label={
                                    item.language.charAt(0).toUpperCase() + item.language.slice(1)
                                }
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                            <ListItemIcon
                                className={Style.deleteButton}
                                onClick={() => handleDelete(item.id)}
                            >
                                <DeleteOutline />
                            </ListItemIcon>
                        </div>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} variant="contained">
                    Cancel
                </Button>
                <Button onClick={addNewCheckListItem} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
