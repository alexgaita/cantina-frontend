import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Modal } from "@mui/material";
import {
  getFilterOptionByValue,
  getValueFromKey,
} from "../../../utils/constants";
import {
  getMenuItemById,
  createOrUpdateMenuItem,
} from "../../../api/menuItems";
import { MenuItemEntity } from "../../../types/entities";
import ItemModal from "./ItemModal";

interface IEditModal {
  open: boolean;
  handleClose: () => void;
  name: string;
}

const EditModal = ({ open, handleClose, name }: IEditModal) => {
  const [itemResponse, setItemResponse] = useState<MenuItemEntity>();
  const [possibleContainers, setPossibleContainers] = useState<string[]>([]);

  const handleGetItem = async () => {
    console.log("intra aici", name);
    const response = await getMenuItemById(name);
    console.log("response", response);
    setItemResponse({
      ...response.menuItem,
      type: getValueFromKey(response.menuItem.type),
    });
    setPossibleContainers(response.possibleContainers);
  };

  const handleSaveItem = async (item: MenuItemEntity) => {
    if (!item) return;
    const newType = getFilterOptionByValue(item.type);
    await createOrUpdateMenuItem({ ...item, type: newType });
    handleClose();
  };

  useEffect(() => {
    handleGetItem().catch(() => handleClose());
  }, []);

  if (!itemResponse) return null;

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
        <Box display={"flex"}>
          <ItemModal
            initialItem={itemResponse}
            possibleContainers={possibleContainers}
            handleSaveItem={handleSaveItem}
            isCreateMode={false}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
