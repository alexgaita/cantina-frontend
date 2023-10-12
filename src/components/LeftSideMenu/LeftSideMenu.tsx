import {CreditCardOutlined, HomeOutlined, MenuOutlined, SlidersOutlined} from "@ant-design/icons";
import UserAvatar from "./UserAvatar";
import MenuItem from "./MenuItem";
import {SCREENS} from "../../utils/constants.tsx";

interface ILeftSideMenu {
    setScreen: (screen: string) => void
}

const LeftSideMenu = ({setScreen}: ILeftSideMenu) => {
    return <div style={{
        width: "15%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20
    }}>
        <UserAvatar image={"https://xsgames.co/randomusers/assets/avatars/male/25.jpg"}
                    name={"Alexandru Gaita"}/>
        <MenuItem title={"Acasa"} icon={HomeOutlined} setScreen={() => setScreen(SCREENS.HOME)}/>
        <MenuItem title={"Meniu"} icon={MenuOutlined} setScreen={() => setScreen(SCREENS.MENU)}/>
        <MenuItem title={"Cartele"} icon={CreditCardOutlined} setScreen={() => setScreen(SCREENS.CARD)}/>
        <MenuItem title={"Setari"} icon={SlidersOutlined} setScreen={() => setScreen(SCREENS.SETTINGS)}/>
    </div>
};

export default LeftSideMenu;