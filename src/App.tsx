import {LeftSideMenu} from "./components/LeftSideMenu";
import {useState} from "react";
import {SCREENS} from "./utils/constants.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";

const App = () => {

    const [selectedScreen, setSelectedScreen] = useState(SCREENS.HOME)

    const renderRightSide = () => {
        switch (selectedScreen) {
            case SCREENS.HOME:
                return <HomeScreen/>
            case SCREENS.SETTINGS:
                return <div>Settings</div>
            case SCREENS.CARD:
                return <div>Card</div>
            case SCREENS.MENU:
                return <div>Menu</div>
            default:
                return null
        }
    }


    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            backgroundImage: 'linear-gradient(#dfebfb, #cfd5f7)',
            padding: 40,
            display: 'flex',
            boxSizing: 'border-box',
            gap: 20
        }}>
            <LeftSideMenu setScreen={setSelectedScreen}/>
            <div style={{flex: 1, borderRadius: '25px', backgroundColor: 'white', padding: 10}}>
                {renderRightSide()}
            </div>
        </div>
    )
}

export default App
