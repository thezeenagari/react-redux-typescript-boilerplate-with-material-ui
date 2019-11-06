import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { omit } from "app/utils";

import { IRootState } from "app/reducers";
import { AddVehicleType } from "app/components";
import { VehicleTypesActions } from "app/actions";
import { ICheckListItem } from "app/models";

interface StateFromProps {
    checkListItems: ICheckListItem[];
}

interface DispatchFromProps {
    vehicleTypesActions: VehicleTypesActions;
}

const mapStateToProps = (state: IRootState): StateFromProps => ({
    checkListItems: state.vehicleTypes.checkListItems,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
    vehicleTypesActions: bindActionCreators(omit(VehicleTypesActions, "Type"), dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddVehicleType);
