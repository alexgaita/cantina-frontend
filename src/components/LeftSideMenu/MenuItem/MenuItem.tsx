import React, {useState} from "react";
import {Typography} from "antd";
import Icon from "@ant-design/icons";
import {COLORS} from "../../../utils/constants.tsx";

interface IMenuItem {
    title: string
    icon: React.ForwardRefExoticComponent<any>
    setScreen: () => void
}

const MenuItem = ({title, icon, setScreen}: IMenuItem) => {

    const [isOver, setIsOver] = useState(false)


    return (
        <div onMouseEnter={() => setIsOver(true)}
             onMouseLeave={() => setIsOver(false)}
             onClick={setScreen}
             style={{
                 minWidth: 160,
                 display: 'flex',
                 gap: 30,
                 alignItems: 'center',
                 borderRadius: '15px',
                 backgroundColor: isOver ? '#f87193' : 'transparent',
                 textAlign: 'center'
             }}>
            <div
                style={{
                    backgroundColor: isOver ? '#eb6081' : 'white',
                    padding: 10,
                    boxSizing: 'border-box',
                    borderRadius: '15px',
                    height: 60, width: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon component={icon} style={{fontSize: 20, color: isOver ? 'white' : COLORS.TEXT_COLOR}}/>
            </div>
            <Typography.Title level={5}
                              style={{color: isOver ? 'white' : COLORS.TEXT_COLOR, margin: 0}}>{title}</Typography.Title>
        </div>
    );
};

export default MenuItem;