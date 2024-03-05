import { useState } from "react";
import { COLORS } from "../../../utils/constants.tsx";
import { Box, SvgIcon, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

interface IFilterCard {
  image: any;
  imageHovered: any;
  name: string;
  filtersClicked: string[];
  handleClick: (filter: string) => void;
}

const FilterCard = ({
  image,
  imageHovered,
  name,
  filtersClicked,
  handleClick,
}: IFilterCard) => {
  const isClicked = filtersClicked.some((el) => el === name);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(name)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
        width: 100,
        height: 110,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        backgroundColor: isHovered || isClicked ? "primary.main" : "initial",
        cursor: isHovered ? "pointer" : "initial",
      }}
    >
      {isHovered || isClicked ? imageHovered : image}
      <Typography
        variant="subtitle2"
        style={{ color: isHovered || isClicked ? "white" : COLORS.TEXT_COLOR }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default FilterCard;
