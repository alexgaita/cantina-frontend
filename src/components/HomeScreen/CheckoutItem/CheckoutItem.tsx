import {Image, Button, Tooltip, Typography} from "antd";
import {COLORS} from "../../../utils/constants.tsx";
import {useState} from "react";

interface ICheckoutItem {
    imageUrl: string
    price: number
    quantity: number,
    name: string
}


const CheckoutItem = ({imageUrl, price, quantity, name}: ICheckoutItem) => {
    const [hoveredButton, setHoveredButton] = useState("")


    return (
        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
            <Image style={{borderRadius:'15px'}} src={imageUrl} width={70}/>
            <div style={{minWidth: 110}}>
                <Tooltip title={name}>
                    <Typography.Text ellipsis={true} strong color={COLORS.TEXT_COLOR}>{name}</Typography.Text>
                </Tooltip>
                <Typography color={COLORS.TEXT_COLOR}>{price} lei</Typography>
            </div>
            <div style={{display: 'flex', gap: 4, paddingRight:10}}>
                <Button shape={"round"} size={"small"}
                        onMouseEnter={() => setHoveredButton("-")}
                        onMouseLeave={() => setHoveredButton("")}
                        style={{
                            backgroundColor: hoveredButton === "-" ? "#323141" : "#f5f5f5",
                            border: '0px'
                        }}><Typography
                    style={{color: hoveredButton === "-" ? "white" : "#323141"}}>-</Typography></Button>
                <Typography style={{minWidth: 20}}>{quantity}</Typography>
                <Button shape={"round"} size={"small"}
                        onMouseEnter={() => setHoveredButton("+")}
                        onMouseLeave={() => setHoveredButton("")}
                        style={{
                            backgroundColor: hoveredButton === "+" ? "#323141" : "#f5f5f5",
                            border: '0px'
                        }}><Typography
                    style={{color: hoveredButton === "+" ? "white" : "#323141"}}>+</Typography></Button>
            </div>
        </div>
    );
};

export default CheckoutItem;