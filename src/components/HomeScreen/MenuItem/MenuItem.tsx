import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  setRef,
} from "@mui/material";
import { COLORS, DEFAULT_IMAGE_URL } from "../../../utils/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import SettingsIcon from "@mui/icons-material/Settings";
import EditModal from "../EditModal/EditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMenuItem } from "../../../api/menuItems";
import { MenuItemViewEntity } from "../../../types/entities";
interface IMenuItem {
  item: MenuItemViewEntity;
  isDailyMenu: boolean;
  refetchMenu: (value: boolean) => void;
  addToCart: (item: MenuItemViewEntity) => void;
}

const MenuItem = ({ item, isDailyMenu, refetchMenu, addToCart }: IMenuItem) => {
  const { isAdminMode } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (openModal === false) {
      refetchMenu(true);
    }
  }, [openModal]);

  return (
    <Box
      key={item.name}
      sx={{
        width: 200,
        height: 310,
        position: "relative",
      }}
    >
      {openModal && (
        <EditModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          name={item.name}
        />
      )}

      <Box
        sx={{
          width: 200,
          height: 260,
          // backgroundColor: "gold",
          position: "absolute",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "20px",
          top: 40,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          height: 310,
          gap: 1,
          flexDirection: "column",
          width: "100%",
          // backgroundColor: "red",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <img
          src={item.photoUrl ?? DEFAULT_IMAGE_URL}
          width={150}
          height={150}
        />
        <Tooltip title={item.name} placement="top">
          <Typography
            variant="subtitle2"
            sx={{
              color: COLORS.TEXT_COLOR,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: isDailyMenu ? 4 : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.name}
          </Typography>
        </Tooltip>

        <Box
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-around",
            // backgroundColor: "blue",
            width: 200,
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            {!isDailyMenu && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: COLORS.TEXT_COLOR,
                  textDecoration: "underline",
                }}
              >
                {item.discountedPrice} lei/{item.servingSize}
              </Typography>
            )}
            <Typography
              variant={isDailyMenu ? "subtitle2" : "subtitle1"}
              sx={{
                color: COLORS.TEXT_COLOR,
                fontWeight: "bold",
              }}
            >
              {isDailyMenu
                ? "1 cartela/meniu"
                : `${item.normalPrice} lei/${item.servingSize}`}
            </Typography>
          </Box>

          {isAdminMode ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Avatar
                onClick={async () => {
                  console.log("clicked", openModal, name);

                  await deleteMenuItem(item.name);
                  refetchMenu(true);
                }}
                variant="square"
                sx={{
                  bgcolor: "primary.main",
                  display: "flex",
                  borderRadius: "10px",
                  width: 33,
                  height: 33,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </Avatar>
              <Avatar
                onClick={() => {
                  console.log("clicked", openModal, name);

                  setOpenModal(true);
                }}
                variant="square"
                sx={{
                  bgcolor: "primary.main",
                  display: "flex",
                  borderRadius: "10px",
                  width: 33,
                  height: 33,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <SettingsIcon sx={{ color: "white" }} />
              </Avatar>
            </Box>
          ) : (
            <Avatar
              onClick={() => addToCart(item)}
              variant="square"
              sx={{
                bgcolor: "primary.main",
                display: "flex",
                borderRadius: "10px",
                width: 33,
                height: 33,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                style={{ color: "white", fontSize: "25px", marginBottom: 3 }}
              >
                +
              </Typography>
            </Avatar>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItem;
