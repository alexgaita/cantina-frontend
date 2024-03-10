import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Address } from "../../../types/entities";
import { useState } from "react";
import { COLORS } from "../../../utils/constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { deleteUserAddress, updateUserAddress } from "../../../api/user";
interface AdressCardProps {
  initialAddress: Address;
  deleteUnsavedAddress: () => void;
  handleRefetchData: () => void;
}

const AddressCard = ({
  initialAddress,
  deleteUnsavedAddress,
  handleRefetchData,
}: AdressCardProps) => {
  const [address, setAddress] = useState<Address>(initialAddress);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(initialAddress.id === 0 ?? false);

  const handleSaveChanges = async (data: Address) => {
    await updateUserAddress(data);
    if (isEditing) {
      setIsEditing(false);
    }

    handleRefetchData();
  };

  const handleDeleteAddress = async () => {
    if (address.id === 0) {
      deleteUnsavedAddress();
      return;
    }

    await deleteUserAddress(address.id);
    handleRefetchData();
  };

  return (
    <Box
      key={address.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: 500,
        minHeight: 130,
        maxHeight: 130,
        border: `1px solid ${
          address.isCurrent ? COLORS.PRIMARY_COLOR : "grey"
        }`,
        borderRadius: "20px",
        padding: 2,
        display: "flex",
        alignItems: "center",
        boxShadow: address.isCurrent
          ? "rgba(46, 49, 146, 0.4) 0px 3px 8px"
          : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        gap: 2,
        paddingRight: 3,
        boxSizing: "border-box",
      }}
    >
      {address.id !== 0 && (
        <Tooltip title={"Selecteaza locatia implicita"} placement="top">
          <IconButton
            onClick={() => {
              handleSaveChanges({ ...address, isCurrent: true });
            }}
          >
            <LocationOnIcon
              style={{
                color: address.isCurrent ? COLORS.PRIMARY_COLOR : "grey",
                fontSize: 50,
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      {isEditing ? (
        <TextField
          label="Adresa"
          multiline
          minRows={3}
          variant="standard"
          value={address.value}
          onChange={(e) => setAddress({ ...address, value: e.target.value })}
          fullWidth
        />
      ) : (
        <Tooltip title={address.value} placement="top">
          <Typography
            variant="subtitle1"
            sx={{
              flex: 1,
              //   height: "100%",
              color: COLORS.TEXT_COLOR,
              fontWeight: 700,
              alignSelf: "flex-start",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {address.value}
          </Typography>
        </Tooltip>
      )}

      <Box width={20} alignSelf={"flex-start"} mr={1}>
        {isHovered && (
          <>
            {isEditing ? (
              <IconButton onClick={() => handleSaveChanges(address)}>
                <CheckIcon
                  style={{
                    color: COLORS.PRIMARY_COLOR,
                    fontSize: 30,
                  }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <EditIcon
                  style={{
                    color: COLORS.PRIMARY_COLOR,
                    fontSize: 30,
                  }}
                  onClick={() => setIsEditing(true)}
                />
              </IconButton>
            )}

            <IconButton onClick={handleDeleteAddress}>
              <DeleteIcon
                style={{
                  color: COLORS.PRIMARY_COLOR,
                  fontSize: 30,
                }}
              />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AddressCard;
