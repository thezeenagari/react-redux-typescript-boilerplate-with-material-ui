import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "app/reducers";
import { VehicleTypes } from "app/components";
import { IVehicleTypeModel } from "app/models";

interface StateFromProps {
    vehicleTypes: IVehicleTypeModel[];
}

interface DispatchFromProps {}

const mapStateToProps = (state: IRootState): StateFromProps => ({
    vehicleTypes: state.vehicleTypes.vehicleTypesList,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleTypes);
