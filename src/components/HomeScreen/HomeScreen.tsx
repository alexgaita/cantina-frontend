// interface IHomeScreen {
//
// }

import { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout/Checkout.tsx";
import {
  COLORS,
  getFilterOptionByValue,
  getValueFromKey,
} from "../../utils/constants.tsx";

import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Button,
  Badge,
  Alert,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import MenuItem from "./MenuItem/MenuItem.tsx";
import { getMenuItems, uploadMenu } from "../../api/menuItems.tsx";
import DailyMenuIcon from "./icons/DailyMenuIcon.tsx";
import {
  CartItemEntity,
  CartStorage,
  MenuItemEntity,
  MenuItemViewEntity,
} from "../../types/entities.ts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UserContext } from "../../contexts/UserContext.tsx";
import axiosInstance from "../../api/axiosConfig.tsx";
import { useSnackbar } from "notistack";
import Filters from "./Filters/Filters.tsx";
import CreateModal from "./EditModal/CreateModal.tsx";
import SugestionsModal from "./EditModal/SugestionsModal.tsx";
import dayjs from "dayjs";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const HomeScreen = () => {
  const { isAdminMode } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const [cartOpen, setCartOpen] = useState(false);
  const [refetchMenu, setRefetchMenu] = useState(true);
  const [filtersClicked, setFilterClicked] = useState<string[]>([]);

  const [menuItems, setMenuItems] = useState<MenuItemViewEntity[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const [possibleContainers, setPossibleContainers] = useState<string[]>([]);
  const [suggestionItems, setSuggestionItems] = useState<MenuItemEntity[]>([]);

  const [recalculateCart, setRecalculateCart] = useState(false);

  const getCartLength = () => {
    const localCart: CartStorage = JSON.parse(
      localStorage.getItem("cartData") || JSON.stringify({ data: [] })
    );

    const localCartData = localCart.data;

    console.log("localCart", localCart);

    if (
      localCart.updatedAt &&
      !dayjs().isSame(dayjs(localCart.updatedAt), "day")
    ) {
      localStorage.setItem(
        "cartData",
        JSON.stringify({ data: [], updatedAt: dayjs().toISOString() })
      );
      return 0;
    }

    return localCartData.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const [cartLength, setCartLength] = useState(getCartLength());

  useEffect(() => {
    if (!recalculateCart) return;
    setCartLength(getCartLength());
    setRecalculateCart(false);
  }, [recalculateCart]);

  const addToCart = (item: MenuItemViewEntity) => {
    const localCart: CartItemEntity[] = JSON.parse(
      localStorage.getItem("cartData") || JSON.stringify({ data: [] })
    ).data;

    const itemExists = localCart.some(
      (cartItem) => cartItem.item.name === item.name
    );

    let newCart = localCart;

    if (itemExists) {
      newCart = localCart.map((cartItem) => {
        if (cartItem.item.name === item.name) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }

        return cartItem;
      });
    } else {
      newCart = [...localCart, { item, quantity: 1 }];
    }

    localStorage.setItem(
      "cartData",
      JSON.stringify({ data: newCart, updatedAt: dayjs().toISOString() })
    );
    setCartLength((prev) => prev + 1);
  };

  const [loadingMenu, setLoadingMenu] = useState(false);

  const handleGetMenuItems = async () => {
    try {
      const response = await getMenuItems();

      setMenuItems(response.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isAdminMode && cartOpen) {
      setCartOpen(false);
    }
  }, [isAdminMode, cartOpen]);

  useEffect(() => {
    if (!refetchMenu) return;

    handleGetMenuItems();
    setRefetchMenu(false);
  }, [refetchMenu]);

  const handleClickFilter = (filter: string) => {
    const index = filtersClicked.findIndex((item) => item === filter);

    if (index < 0) {
      setFilterClicked([...filtersClicked, filter]);
      return;
    }

    setFilterClicked((prev) => prev.filter((item) => item !== filter));
  };

  const handleFileUpload = async (event: any) => {
    setLoadingMenu(true);

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadMenu(file);
      event.target.value = null;

      console.log("response", response);

      if (response.items.length) {
        setSuggestModalOpen(true);
        setSuggestionItems(response.items);
        setPossibleContainers(response.containers);
      } else {
        setRefetchMenu(true);
      }

      enqueueSnackbar(
        <Typography>Meniul a fost incarcat cu success</Typography>,
        {
          variant: "success",
          autoHideDuration: 5000,
        }
      );
    } catch (error) {
      console.error(error);
      event.target.value = null;
      enqueueSnackbar(
        <Typography>Meniul nu a fost incarcat cu success</Typography>,
        {
          variant: "error",
        }
      );
    }

    setLoadingMenu(false);
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

          {isAdminMode ? (
            <>
              <Button
                component="label"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
              >
                Adauga Produs
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={
                  loadingMenu ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CloudUploadIcon />
                  )
                }
                disabled={loadingMenu}
              >
                Incarca Meniu
                <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
              </Button>
            </>
          ) : (
            <Badge badgeContent={cartLength} color="error">
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
          )}
        </div>
        <Alert severity="info">
          Preturile subliniate sunt preturile reduse pentru angajatii UPT in
          baza cartelelor
        </Alert>
        <Filters
          filtersClicked={filtersClicked}
          handleClickFilter={handleClickFilter}
        />

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
          {menuItems
            .filter(
              (item) =>
                !filtersClicked.length ||
                (
                  filtersClicked.map(
                    (filter) => getFilterOptionByValue(filter) ?? null
                  ) as string[]
                ).includes(item.type)
            )
            .map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                isDailyMenu={item.type === "DAILY_MENU"}
                refetchMenu={setRefetchMenu}
                addToCart={addToCart}
              />
            ))}
        </div>
      </div>
      {cartOpen && (
        <Checkout recalculateCart={() => setRecalculateCart(true)} />
      )}
      {createModalOpen && (
        <CreateModal
          open={createModalOpen}
          handleClose={() => {
            setCreateModalOpen(false);
            setRefetchMenu(true);
          }}
        />
      )}
      {suggestModalOpen && suggestionItems.length && (
        <SugestionsModal
          open={suggestModalOpen}
          handleClose={() => {
            setSuggestModalOpen(false);
            setRefetchMenu(true);
          }}
          initialItems={suggestionItems.map((item) => ({
            ...item,
            type: getValueFromKey(item.type),
          }))}
          possibleContainers={possibleContainers}
        />
      )}
    </div>
  );
};

export default HomeScreen;
