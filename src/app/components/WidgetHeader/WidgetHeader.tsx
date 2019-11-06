import * as React from "react";
import Typography from "@material-ui/core/Typography";

import * as Style from "./WidgetHeader.css";

export namespace WidgetHeader {
    export interface IProps {
        headerText: string;
        headerSmallText: string;
        rightPanel?: JSX.Element;
    }
}

export const WidgetHeader: React.SFC<WidgetHeader.IProps> = ({
    headerText,
    headerSmallText,
    rightPanel,
}) => (
    <div className={Style.header}>
        <div>
            <Typography paragraph>{headerSmallText}</Typography>
            <Typography variant="h6" noWrap>
                {headerText}
            </Typography>
        </div>
        <>{rightPanel}</>
    </div>
);
