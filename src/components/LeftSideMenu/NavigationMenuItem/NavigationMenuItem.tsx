import React, { useContext, useState } from "react";
import { COLORS } from "../../../utils/constants.tsx";
import { Box, SvgIcon, Typography } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext.tsx";

interface IMenuItem {
  title: string;
  icon: any;
  setScreen: () => void;
}

const NavigationMenuItem = ({ title, icon, setScreen }: IMenuItem) => {

  return (
    <Box
      onClick={setScreen}
      sx={{
        padding: 2,
        width: "100%",
        display: "flex",
        paddingLeft: {
          sm: 14,
          xs: 7,
        },
        gap: 2,
        bgcolor: "transparent",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: isOver ? "#f87193" : "red",
      }}
    >
      <SvgIcon component={icon} style={{ fontSize: 20 }} />
      <Typography
        variant="subtitle1"
        sx={{
          color: "white",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default NavigationMenuItem;
