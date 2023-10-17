// interface ICheckout {
//
// }

import { Button, Typography} from "antd";
import {COLORS} from "../../../utils/constants.tsx";
import CheckoutItem from "../CheckoutItem/CheckoutItem.tsx";

const imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"

const Checkout = () => {


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 320,
            borderLeft: "2px solid grey",
            paddingTop: 15,
            paddingLeft: 15,
            paddingBottom: 15,
            boxSizing: 'border-box',
            gap: 5

        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: "70%",
                maxHeight: "70%",
                overflowY: 'hidden',
                overflow: 'auto',
                gap:4
            }}>
                <CheckoutItem imageUrl={imageUrl} price={45} name={"Ciorba de verisoare lunga"} quantity={10}/>
                <CheckoutItem imageUrl={imageUrl} price={45} name={"Ciorba de verisoare lunga"} quantity={10}/>
                <CheckoutItem imageUrl={imageUrl} price={45} name={"Ciorba de verisoare lunga"} quantity={10}/>
                <CheckoutItem imageUrl={imageUrl} price={45} name={"Ciorba de verisoare lunga"} quantity={10}/>
            </div>
            <div style={{display: 'flex', flex: 1, flexDirection: 'column',gap:2}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography.Text strong style={{color: COLORS.TEXT_COLOR}}>Subtotal </Typography.Text>
                    <Typography.Text strong style={{color: COLORS.TEXT_COLOR}}>100 lei </Typography.Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography.Text strong style={{color: "grey"}}>Taxe </Typography.Text>
                    <Typography.Text strong style={{color: "grey"}}>100 lei </Typography.Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography.Text strong style={{color: "grey"}}>Servicii operationale </Typography.Text>
                    <Typography.Text strong style={{color: "grey"}}>100 lei </Typography.Text>
                </div>
                <div style={{width:"100%",height:'2px',backgroundColor:'grey'}}/>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography.Text strong style={{color: COLORS.TEXT_COLOR}}>Total </Typography.Text>
                    <Typography.Text strong style={{color: COLORS.TEXT_COLOR}}>200 lei </Typography.Text>
                </div>
                <Button style={{marginTop:'auto'}}>Place Order</Button>
            </div>


        </div>
    );
};

export default Checkout;