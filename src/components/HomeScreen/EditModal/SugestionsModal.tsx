import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Modal } from "@mui/material";
import {
  getFilterOptionByValue,
  getValueFromKey,
} from "../../../utils/constants";
import { createOrUpdateMenuItem } from "../../../api/menuItems";
import { MenuItemEntity } from "../../../types/entities";
import ItemModal from "./ItemModal";
import dayjs from "dayjs";
import { getAllContainers } from "../../../api/containers";

interface SugestionsModalProps {
  open: boolean;
  handleClose: () => void;
  initialItems: MenuItemEntity[];
  possibleContainers: string[];
}

const SugestionsModal = ({
  open,
  handleClose,
  initialItems,
  possibleContainers,
}: SugestionsModalProps) => {
  const handleSaveItem = async (itemToSave: MenuItemEntity) => {
    if (!itemToSave.name) return;
    const newType = getFilterOptionByValue(itemToSave.type);
    await createOrUpdateMenuItem({ ...itemToSave, type: newType });
  };

  if (!initialItems.length) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        width={"60%"}
        height={"80%"}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 5,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          overflow: "auto",
        }}
      >
        {initialItems.map((item, index) => (
          <>
            <Box display={"flex"} key={item.name}>
              <ItemModal
                initialItem={item}
                possibleContainers={possibleContainers}
                handleSaveItem={handleSaveItem}
                isCreateMode={false}
              />
            </Box>
            <Box
              key={`divider-${index}`}
              sx={{
                width: "100%",
                minHeight: 2,
                maxHeight: 2,
                bgcolor: "primary.main",
              }}
            />
          </>
        ))}
      </Box>
    </Modal>
  );
};

export default SugestionsModal;
