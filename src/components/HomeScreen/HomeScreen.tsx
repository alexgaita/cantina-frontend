// interface IHomeScreen {
//
// }

import { AutoComplete, Button, Image } from "antd";
import { useEffect, useState } from "react";
import Checkout from "./Checkout/Checkout.tsx";
import { COLORS } from "../../utils/constants.tsx";
import FilterCard from "./FilterCard/FilterCard.tsx";
import SupeIcon from "./icons/SupeIcon.tsx";
import FelPrincipalIcon from "./icons/FelPrincipalIcon.tsx";
import GarnituriIcon from "./icons/GarnituriIcon.tsx";
import DesertIcon from "./icons/DesertIcon.tsx";
import SosuriIcon from "./icons/SosuriIcon.tsx";
import { IconButton, Badge, Alert, Typography, Menu } from "@mui/material";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import MenuItem from "./MenuItem/MenuItem.tsx";
import { NormalItem } from "../../types/responses.ts";
import axiosInstance from "../../api/axiosConfig.tsx";
import { getMenuItems } from "../../api/menuItems.tsx";
import DailyMenuIcon from "./icons/DailyMenuIcon.tsx";
import { MenuItemEntity } from "../../types/entities.ts";

const options = [{ value: "Apa" }, { value: "Buger" }, { value: "Ciorba" }];
const imageUrl =
  "https://www.freeiconspng.com/thumbs/fast-food-png/fast-food-png-most-popular-fast-food-snacks-in-your-area-and-most--3.png";

const HomeScreen = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersClicked, setFilterClicked] = useState<string[]>([]);

  const [menuItems, setMenuItems] = useState<MenuItemEntity[]>([]);

  const handleGetMenuItems = async () => {
    try {
      const response = await getMenuItems();

      const dailyMenuItems: MenuItemEntity[] = response.menu.map((item) => {
        return {
          name: item.description,
          isDailyMenu: true,
          normalPrice: 0,
          discountedPrice: 0,
          servingSize: "portie",
        } as MenuItemEntity;
      });

      const normalItems: MenuItemEntity[] = response.normalItems.map((item) => {
        return {
          name: item.name,
          isDailyMenu: false,
          normalPrice: item.normalPrice,
          discountedPrice: item.discountedPrice,
          servingSize: item.servingSize,
        } as MenuItemEntity;
      });

      setMenuItems([...dailyMenuItems, ...normalItems]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleGetMenuItems();
  }, []);

  const handleClickFilter = (filter: string) => {
    const index = filtersClicked.findIndex((item) => item === filter);

    if (index < 0) {
      setFilterClicked([...filtersClicked, filter]);
      return;
    }

    setFilterClicked((prev) => prev.filter((item) => item !== filter));
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          paddingTop: 30,
          paddingLeft: 40,
          paddingRight: 40,
          boxSizing: "border-box",
          gap: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
          >
            Cantina Studențească Politehnica
          </Typography>
          <Badge badgeContent={1} color="error">
            <IconButton
              onClick={() => setCartOpen(!cartOpen)}
              sx={{
                height: 50,
                width: 50,
                borderRadius: "15px",
                backgroundColor: cartOpen ? "primary.main" : "#EDEDF0",
                border: "0px",
              }}
            >
              <ShoppingCartOutlined
                style={{
                  fontSize: "20px",
                  color: cartOpen ? "#EDEDF0" : COLORS.PRIMARY_COLOR,
                }}
              />
            </IconButton>
          </Badge>
        </div>
        <Alert severity="info">
          Preturile subliniate sunt preturile reduse pentru angajatii UPT in
          baza cartelelor
        </Alert>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <FilterCard
            image={<DailyMenuIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<DailyMenuIcon fillColor="white" />}
            name={"Meniul Zilei"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />
          <FilterCard
            image={<SupeIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<SupeIcon fillColor="white" />}
            name={"Supe"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />
          <FilterCard
            image={<FelPrincipalIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<FelPrincipalIcon fillColor="white" />}
            name={"Fel Principal"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />
          <FilterCard
            image={<GarnituriIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<GarnituriIcon fillColor="white" />}
            name={"Garnituri"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />

          <FilterCard
            image={<DesertIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<DesertIcon fillColor="white" />}
            name={"Desert"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />
          <FilterCard
            image={<SosuriIcon fillColor={COLORS.PRIMARY_COLOR} />}
            imageHovered={<SosuriIcon fillColor="white" />}
            name={"Extra"}
            filtersClicked={filtersClicked}
            handleClick={handleClickFilter}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            rowGap: 1,
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,

            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              imageUrl={imageUrl}
              isDailyMenu={item.isDailyMenu}
              name={item.name}
              normalPrice={item.normalPrice}
              discountedPrice={item.discountedPrice}
              servingSize={item.servingSize}
            />
          ))}
        </div>
      </div>
      {cartOpen && <Checkout />}
    </div>
  );
};

export default HomeScreen;
