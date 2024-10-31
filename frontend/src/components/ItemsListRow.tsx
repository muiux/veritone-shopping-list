import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useContext } from "react";
import { Context } from "../context";
import { toggleItemPurchased } from "../context/actions";
import { Item } from "./ItemsList";

type ItemsListRowProps = {
  item: Item;
  handleEditClick: (item: Item) => void;
  handleDeleteClick: (item: Item) => void;
};

const ItemsListRow: React.FC<ItemsListRowProps> = ({
  item,
  handleEditClick,
  handleDeleteClick,
}) => {
  const { dispatch } = useContext(Context);

  const handlePurchasedItem = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(await toggleItemPurchased(item, e.target?.checked));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        py: 3,
        pl: 1,
        pr: 3,
        background: item.purchased ? "#D5DFE92B" : "",
        borderColor: item.purchased ? "transparent" : "",
        mb: 2,
      }}
      variant="outlined"
    >
      <Checkbox
        checked={!!item.purchased}
        sx={{ mr: 1 }}
        onChange={handlePurchasedItem}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: item.purchased ? "primary.main" : "text.primary",
            textDecoration: item.purchased ? "line-through" : "none",
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textDecoration: item.purchased ? "line-through" : "none",
          }}
        >
          {item.description}
        </Typography>
      </Box>
      <Tooltip title="Edit">
        <IconButton onClick={() => handleEditClick(item)}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => handleDeleteClick(item)}>
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default ItemsListRow;
