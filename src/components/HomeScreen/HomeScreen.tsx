// interface IHomeScreen {
//
// }

import {AutoComplete, Badge, Button, Typography} from "antd";
import {SearchOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";


const options = [{value: "Apa"}, {value: "Buger"}, {value: "Ciorba"}]
const HomeScreen = () => {

    const [searchBoxOpen, setSearchBoxOpen] = useState(false)
    const [searchText, setSearchText] = useState("")

    const [cartOpen, setCartOpen] = useState(false)


    useEffect(() => {
        if (searchBoxOpen) {
            setSearchText("")
        }
    }, [searchBoxOpen]);

    return (
        <div style={{display: 'flex', height:'100%'}}>
            <div
                style={{display: 'flex', flex: 1, flexDirection: 'column', paddingLeft: 40, paddingRight: 40, boxSizing: 'border-box'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography.Title level={1} style={{color: '#333446', fontSize: 50}}>Cantina UPT</Typography.Title>
                    <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
                        {
                            searchBoxOpen && (
                                <AutoComplete
                                    value={searchText}
                                    options={options}
                                    style={{width: 300}}
                                    filterOption={true}
                                    onChange={(value) => setSearchText(value)}
                                    placeholder="Search for your item"
                                />
                            )
                        }
                        <Button
                            onClick={() => setSearchBoxOpen(!searchBoxOpen)}
                            style={{height: 50, width: 50, borderRadius: '15px', backgroundColor: searchBoxOpen ? "#323141" : "#f5f5f5", border: '0px'}}
                            icon={<SearchOutlined
                                style={{fontSize: "20px", color: searchBoxOpen ? "#f5f5f5" : "#323141"}}/>}/>
                        <Badge count={1}>
                            <Button
                                onClick={() => setCartOpen(!cartOpen)}
                                style={{height: 50, width: 50, borderRadius: '15px', backgroundColor: cartOpen ? "#323141" : "#f5f5f5", border: '0px'}}
                                icon={<ShoppingCartOutlined
                                    style={{fontSize: "20px", color: cartOpen ? "#f5f5f5" : "#323141"}}/>}/>
                        </Badge>
                    </div>

                </div>

            </div>

            {
                cartOpen && (
                    <div style={{display: 'flex', width: 250, borderLeft:"2px solid grey" }}>
                        Checkbox
                    </div>
                )
            }


        </div>

    );
};

export default HomeScreen;