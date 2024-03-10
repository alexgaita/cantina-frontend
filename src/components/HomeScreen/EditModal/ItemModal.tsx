import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  COLORS,
  DEFAULT_IMAGE_URL,
  FILTER_OPTIONS,
  WEEK_DAYS,
  getFilterOptionByValue,
} from "../../../utils/constants";
import { MenuItemEntity } from "../../../types/entities";
import { useState } from "react";
import { uploadItemPhoto } from "../../../api/menuItems";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

interface ItemModalProps {
  initialItem: MenuItemEntity;
  possibleContainers: string[];
  handleSaveItem: (item: MenuItemEntity) => void;
  isCreateMode: boolean;
}

function isNumeric(value: string): boolean {
  return !isNaN(Number(value));
}

const ItemModal = ({
  initialItem,
  possibleContainers,
  handleSaveItem,
  isCreateMode,
}: ItemModalProps) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<MenuItemEntity>(initialItem);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const url = await uploadItemPhoto(item.name, e.target.files![0]);
    e.target.value = "";
    setItem({ ...item, photoUrl: url });
    setLoading(false);
  };

  const isDailyMenu = getFilterOptionByValue(item.type) === "DAILY_MENU";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 0.75,
          paddingRight: 3,
          gap: 4,
          overflow: "auto",
          paddingTop: 1,
        }}
      >
        {isCreateMode ? (
          <TextField
            fullWidth
            label="Nume Produs"
            value={item.name}
            onChange={(e) => {
              setItem({ ...item, name: e.target.value });
            }}
            variant="outlined"
          />
        ) : (
          <Typography variant="h4" sx={{ color: COLORS.TEXT_COLOR }}>
            {item.name ?? "Numele produsului"}
          </Typography>
        )}

        {!isDailyMenu && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              boxSizing: "border-box",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <TextField
              sx={{ flex: "45%" }}
              label="Pret angajat UPT"
              value={item.discountedPrice}
              onChange={(e) => {
                if (!isNumeric(e.target.value)) return;
                setItem({ ...item, discountedPrice: Number(e.target.value) });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">lei</InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              sx={{ flex: "45%" }}
              label="Pret normal"
              value={item.normalPrice}
              onChange={(e) => {
                if (!isNumeric(e.target.value)) return;
                setItem({ ...item, normalPrice: Number(e.target.value) });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">lei</InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              sx={{ flex: "45%" }}
              label="Portie"
              onChange={(e) =>
                setItem({ ...item, servingSize: e.target.value })
              }
              value={item.servingSize}
              variant="outlined"
            />
            <Autocomplete
              id="combo-box-categorie"
              value={item.type}
              onChange={(_, newValue) => setItem({ ...item, type: newValue })}
              options={
                Object.entries(FILTER_OPTIONS)
                  .filter((option) => option[0] !== "DAILY_MENU")
                  .map((option) => option[1]) as string[]
              }
              sx={{ flex: "45%" }}
              renderInput={(params) => (
                <TextField {...params} label="Categorie" />
              )}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: COLORS.TEXT_COLOR }}>
            Zile recurente
          </Typography>
          <ToggleButtonGroup
            value={item.recurringDays}
            onChange={(
              _: React.MouseEvent<HTMLElement>,
              newFormats: string[]
            ) => {
              setItem({ ...item, recurringDays: newFormats });
            }}
            fullWidth
            aria-label="text formatting"
          >
            {Object.keys(WEEK_DAYS).map((day) => (
              <ToggleButton key={day} value={day} aria-label={day}>
                {WEEK_DAYS[day as keyof typeof WEEK_DAYS]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <TextField
            sx={{ flex: "45%" }}
            type="date"
            value={item.firstPossibleDay}
            onChange={(e) =>
              setItem({ ...item, firstPossibleDay: e.target.value })
            }
            label="Prima data"
            variant="outlined"
          />
          <TextField
            sx={{ flex: "45%" }}
            value={item.lastPossibleDay}
            type="date"
            onChange={(e) =>
              setItem({ ...item, lastPossibleDay: e.target.value })
            }
            label="Ultima Data"
            variant="outlined"
          />
          <Autocomplete
            disablePortal
            id="combo-box-containere"
            multiple
            value={item.containers}
            onChange={(_, newValue) =>
              setItem({ ...item, containers: newValue })
            }
            options={possibleContainers}
            sx={{ flex: "45%" }}
            renderInput={(params) => (
              <TextField {...params} label="Containere" />
            )}
          />
        </Box>
      </Box>

      <Box
        flex={0.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          boxSizing: "border-box",
          paddingBottom: 4,
          gap: 3,
        }}
      >
        <img
          src={item.photoUrl ?? DEFAULT_IMAGE_URL}
          width={350}
          height={300}
        />
        <Button
          component="label"
          role={undefined}
          sx={{ width: 200 }}
          variant="contained"
          disabled={loading}
          tabIndex={-1}
          startIcon={
            loading ? <CircularProgress size={20} /> : <CloudUploadIcon />
          }
        >
          Schimba imaginea
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        <Button
          component="label"
          role={undefined}
          sx={{ width: 200, marginTop: "auto" }}
          variant="contained"
          onClick={() => handleSaveItem(item)}
          tabIndex={-1}
          startIcon={<SaveIcon />}
        >
          Salveaza
        </Button>
      </Box>
    </>
  );
};

export default ItemModal;
