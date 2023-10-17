// interface IHomeScreen {
//
// }

import {AutoComplete, Badge, Button, Image, Typography} from "antd";
import {SearchOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import Checkout from "./Checkout/Checkout.tsx";
import {COLORS} from "../../utils/constants.tsx";
import FilterCard from "./FilterCard/FilterCard.tsx";

const options = [{value: "Apa"}, {value: "Buger"}, {value: "Ciorba"}]
const imageUrl = "https://www.freeiconspng.com/thumbs/fast-food-png/fast-food-png-most-popular-fast-food-snacks-in-your-area-and-most--3.png"

const HomeScreen = () => {

    const [searchBoxOpen, setSearchBoxOpen] = useState(false)
    const [searchText, setSearchText] = useState("")

    const [cartOpen, setCartOpen] = useState(false)
    const [filtersClicked, setFilterClicked] = useState<string[]>([])

    const handleClickFilter = (filter: string) => {
        const index = filtersClicked.findIndex((item) => item === filter)

        if (index < 0) {
            setFilterClicked([...filtersClicked, filter])
            return
        }

        setFilterClicked((prev) => prev.filter((item) => item !== filter))
    }


    useEffect(() => {
        if (searchBoxOpen) {
            setSearchText("")
        }
    }, [searchBoxOpen]);

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    paddingLeft: 40,
                    paddingRight: 40,
                    boxSizing: 'border-box',
                    gap: 20
                }}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography.Title level={1} style={{color: COLORS.TEXT_COLOR, fontSize: 50}}>Cantina
                        UPT</Typography.Title>
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
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: '15px',
                                backgroundColor: searchBoxOpen ? "#323141" : "#f5f5f5",
                                border: '0px'
                            }}
                            icon={<SearchOutlined
                                style={{fontSize: "20px", color: searchBoxOpen ? "#f5f5f5" : "#323141"}}/>}/>
                        <Badge count={1}>
                            <Button
                                onClick={() => setCartOpen(!cartOpen)}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: '15px',
                                    backgroundColor: cartOpen ? "#323141" : "#f5f5f5",
                                    border: '0px'
                                }}
                                icon={<ShoppingCartOutlined
                                    style={{fontSize: "20px", color: cartOpen ? "#f5f5f5" : "#323141"}}/>}/>
                        </Badge>
                    </div>
                </div>
                <div style={{
                    display: 'flex', gap: 20, marginBottom: 30,
                }}>
                    <FilterCard path={"/supe.png"} name={"Supe"} filtersClicked={filtersClicked}
                                handleClick={handleClickFilter}/>
                    <FilterCard path={"/fel_principal.png"} name={"Fel Principal"} filtersClicked={filtersClicked}
                                handleClick={handleClickFilter}/>
                    <FilterCard path={"/garnituri.png"} name={"Garnituri"} filtersClicked={filtersClicked}
                                handleClick={handleClickFilter}/>
                    <FilterCard path={"/desert.png"} name={"Desert"} filtersClicked={filtersClicked}
                                handleClick={handleClickFilter}/>
                    <FilterCard path={"/sosuri.png"} name={"Sosuri"} filtersClicked={filtersClicked}
                                handleClick={handleClickFilter}/>
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: 1000,
                    gap: 30,
                    rowGap: 40,
                    flex: 1,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    paddingTop: 50,
                    boxSizing: 'border-box',
                    overflow: 'auto'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: '20px',
                        padding: 10,
                        boxSizing: 'border-box',
                        width: 180,
                        height: 250
                    }}>
                        <div style={{position: 'relative', top: -40, alignSelf: 'center', boxSizing: 'border-box'}}>
                            <Image style={{borderRadius: '15px'}} src={imageUrl} width={120}/>
                        </div>
                        <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>Meniu
                            Burger</Typography.Text>
                        <Typography.Text style={{color: 'grey', fontSize: '10px'}}>Descriere importanta a burgerului sau
                            ce
                            contine</Typography.Text>
                        <div
                            style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                            <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>30
                                lei/buc</Typography.Text>
                            <Button shape={"circle"} size={"middle"}
                                    style={{
                                        backgroundColor: COLORS.TEXT_COLOR,
                                        border: '0px'
                                    }}><Typography style={{color: 'white'}}>+</Typography></Button>
                        </div>

                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: '20px',
                        padding: 10,
                        boxSizing: 'border-box',
                        width: 180,
                        height: 250,
                    }}>
                        <div style={{position: 'relative', top: -40, alignSelf: 'center', boxSizing: 'border-box'}}>
                            <Image style={{borderRadius: '15px'}} src={imageUrl} width={120}/>
                        </div>
                        <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>Meniu
                            Burger</Typography.Text>
                        <Typography.Text style={{color: 'grey', fontSize: '10px'}}>Descriere importanta a burgerului sau
                            ce
                            contine</Typography.Text>
                        <div
                            style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                            <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>30
                                lei/buc</Typography.Text>
                            <Button shape={"circle"} size={"middle"}
                                    style={{
                                        backgroundColor: COLORS.TEXT_COLOR,
                                        border: '0px'
                                    }}><Typography style={{color: 'white'}}>+</Typography></Button>
                        </div>

                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: '20px',
                        padding: 10,
                        boxSizing: 'border-box',
                        width: 180,
                        height: 250,
                    }}>
                        <div style={{position: 'relative', top: -40, alignSelf: 'center', boxSizing: 'border-box'}}>
                            <Image style={{borderRadius: '15px'}} src={imageUrl} width={120}/>
                        </div>
                        <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>Meniu
                            Burger</Typography.Text>
                        <Typography.Text style={{color: 'grey', fontSize: '10px'}}>Descriere importanta a burgerului sau
                            ce
                            contine</Typography.Text>
                        <div
                            style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                            <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>30
                                lei/buc</Typography.Text>
                            <Button shape={"circle"} size={"middle"}
                                    style={{
                                        backgroundColor: COLORS.TEXT_COLOR,
                                        border: '0px'
                                    }}><Typography style={{color: 'white'}}>+</Typography></Button>
                        </div>

                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: '20px',
                        padding: 10,
                        boxSizing: 'border-box',
                        width: 180,
                        height: 250,
                    }}>
                        <div style={{position: 'relative', top: -40, alignSelf: 'center', boxSizing: 'border-box'}}>
                            <Image style={{borderRadius: '15px'}} src={imageUrl} width={120}/>
                        </div>
                        <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>Meniu
                            Burger</Typography.Text>
                        <Typography.Text style={{color: 'grey', fontSize: '10px'}}>Descriere importanta a burgerului sau
                            ce
                            contine</Typography.Text>
                        <div
                            style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                            <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>30
                                lei/buc</Typography.Text>
                            <Button shape={"circle"} size={"middle"}
                                    style={{
                                        backgroundColor: COLORS.TEXT_COLOR,
                                        border: '0px'
                                    }}><Typography style={{color: 'white'}}>+</Typography></Button>
                        </div>

                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: '20px',
                        padding: 10,
                        boxSizing: 'border-box',
                        width: 180,
                        height: 250,
                    }}>
                        <div style={{position: 'relative', top: -40, alignSelf: 'center', boxSizing: 'border-box'}}>
                            <Image style={{borderRadius: '15px'}} src={imageUrl} width={120}/>
                        </div>
                        <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>Meniu
                            Burger</Typography.Text>
                        <Typography.Text style={{color: 'grey', fontSize: '10px'}}>Descriere importanta a burgerului sau
                            ce
                            contine</Typography.Text>
                        <div
                            style={{display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                            <Typography.Text strong style={{color: COLORS.TEXT_COLOR, fontSize: '15px'}}>30
                                lei/buc</Typography.Text>
                            <Button shape={"circle"} size={"middle"}
                                    style={{
                                        backgroundColor: COLORS.TEXT_COLOR,
                                        border: '0px'
                                    }}><Typography style={{color: 'white'}}>+</Typography></Button>
                        </div>

                    </div>


                </div>
            </div>
            {
                cartOpen && (
                    <Checkout/>
                )
            }

        </div>

    );
};

export default HomeScreen;