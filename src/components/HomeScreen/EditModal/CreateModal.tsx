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

interface ICreateModal {
  open: boolean;
  handleClose: () => void;
}

const initialItem: MenuItemEntity = {
  containers: [],
  name: "",
  servingSize: "",
  discountedPrice: 0,
  normalPrice: 0,
  photoUrl: null,
  type: null,
  recurringDays: [],
  firstPossibleDay: dayjs().format("YYYY-MM-DD"),
  lastPossibleDay: dayjs().add(1, "week").format("YYYY-MM-DD"),
};

const CreateModal = ({ open, handleClose }: ICreateModal) => {
  const [possibleContainers, setPossibleContainers] = useState<string[]>([]);

  const getAllPossibleContainers = async () => {
    const containers = await getAllContainers();
    setPossibleContainers(containers);
  };

  const handleSaveItem = async (item: MenuItemEntity) => {
    if (!item.name) return;
    const newType = getFilterOptionByValue(item.type);
    await createOrUpdateMenuItem({ ...item, type: newType });
    handleClose();
  };

  useEffect(() => {
    getAllPossibleContainers();
  }, []);

  if (!possibleContainers) return null;

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
            initialItem={initialItem}
            possibleContainers={possibleContainers}
            handleSaveItem={handleSaveItem}
            isCreateMode={true}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModal;
