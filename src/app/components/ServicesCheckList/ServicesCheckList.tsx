import * as React from "react";

import { Typography, Button, Divider } from "@material-ui/core";
import { Add, CheckCircleOutline, DeleteOutline, DragHandle } from "@material-ui/icons";

import * as Style from "./ServicesCheckList.css";
import { ICheckListItem } from "app/models";

import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { VehicleTypesActions } from "app/actions";

export namespace ServicesCheckList {
    export interface IProps {
        handleOpenModal: () => void;
        checkListItems: ICheckListItem[];
        vehicleTypesActions: VehicleTypesActions;
    }

    export interface IState {
        items: ICheckListItem[];
        openModal: boolean;
        selectedItemId: number | null;
    }
}

// a little function to help us with reordering the result
const reorder = (list: ICheckListItem[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)",
    }),
});

export class ServicesCheckList extends React.Component<
    ServicesCheckList.IProps,
    ServicesCheckList.IState
> {
    constructor(props: ServicesCheckList.IProps) {
        super(props);
        this.state = {
            items: [],
            openModal: false,
            selectedItemId: null,
        };
    }

    componentDidMount() {
        this.setState({
            items: this.props.checkListItems,
        });
    }

    componentDidUpdate(prevProps: ServicesCheckList.IProps) {
        if (prevProps.checkListItems !== this.props.checkListItems) {
            this.setState({
                items: this.props.checkListItems,
            });
        }
    }

    onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(this.state.items, result.source.index, result.destination.index);

        this.setState({
            items,
        });
    };

    openConfirmationModal = (id: number) => {
        this.setState({
            selectedItemId: id,
            openModal: true,
        });
    };

    deleteItem = () => {
        const { selectedItemId } = this.state;
        const { vehicleTypesActions } = this.props;
        if (selectedItemId) {
            vehicleTypesActions.removeCheckListItem(selectedItemId);
            this.handleClose();
        }
    };

    handleClose = () => {
        this.setState({
            openModal: false,
            selectedItemId: null,
        });
    };

    render(): JSX.Element {
        const { handleOpenModal } = this.props;
        const { openModal } = this.state;
        return (
            <div className={Style.servicesCheckList}>
                <div className={Style.servicesCheckListHeader}>
                    <Typography variant="h6" noWrap>
                        Ordinary Service Checklist
                    </Typography>
                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={handleOpenModal}
                    >
                        <Add /> NEW ITEM
                    </Button>
                </div>
                <Divider />
                <div className={Style.servicesCheckListTable}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <RootRef rootRef={provided.innerRef}>
                                    <List>
                                        {this.state.items.map(
                                            (item: ICheckListItem, index: number) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={`${item.id}`}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <ListItem
                                                            ContainerComponent={"div"}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                            className={Style.listItem}
                                                        >
                                                            <ListItemIcon
                                                                className={Style.circleButton}
                                                            >
                                                                <CheckCircleOutline />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.name} />
                                                            <ListItemIcon>
                                                                <DragHandle />
                                                            </ListItemIcon>
                                                            <ListItemIcon
                                                                className={Style.deleteButton}
                                                                onClick={() =>
                                                                    this.openConfirmationModal(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteOutline />
                                                            </ListItemIcon>
                                                        </ListItem>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </List>
                                </RootRef>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <ConfirmationDialog
                    openModal={openModal}
                    handleClose={this.handleClose}
                    handleContinue={this.deleteItem}
                />
            </div>
        );
    }
}
