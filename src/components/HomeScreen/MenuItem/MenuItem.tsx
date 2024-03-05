import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import { COLORS } from "../../../utils/constants";

interface IMenuItem {
  imageUrl: string;
  name: string;
  normalPrice: number;
  discountedPrice: number;
  servingSize: string;
  isDailyMenu: boolean;
}

const MenuItem = ({
  imageUrl,
  name,
  normalPrice,
  discountedPrice,
  servingSize,
  isDailyMenu,
}: IMenuItem) => {
  return (
    <Box
      sx={{
        width: 180,
        height: 310,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: 180,
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
          // backgroundColor: "red",
          boxSizing: "border-box",
          padding: 2,
        }}
      >
        <img src={imageUrl} width={150} />
        <Tooltip title={name}>
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
            {name}
          </Typography>
        </Tooltip>

        <Box
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
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
                {discountedPrice} lei/{servingSize}
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
                : `${normalPrice} lei/${servingSize}`}
            </Typography>
          </Box>

          <Avatar
            onClick={() => alert("clicked")}
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
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItem;
