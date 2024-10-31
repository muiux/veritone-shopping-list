import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ItemEditDrawer from "./ItemEditDrawer";
import { useContext, useState } from "react";
import { AppContext, Context } from "../context";
import Loader from "./Loader";
import ItemsListRow from "./ItemsListRow";
import NoItemsState from "./NoItemsState";
import DeleteItemConfirmationModal from "./DeleteItemConfirmationModal";
import { deleteItem } from "../context/actions";

export type Item = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
};

const ItemsList = () => {
  const { state, dispatch } = useContext<AppContext>(Context);
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState<boolean>(false);

  const toggleDrawerOpen = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
      setTimeout(() => {
        setIsDrawerMounted(false);
      }, 300);
    } else {
      setIsDrawerMounted(true);
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 1);
    }
  };

  const handleEditClick = (item: Item | null) => {
    setActiveItem(item);
    toggleDrawerOpen();
  };

  const handleDeleteClick = (item: Item) => {
    setActiveItem(item);
    setDeleteConfirmationModalOpen(true);
  };

  const handleContinueDelete = async () => {
    if (!activeItem) {
      throw new Error("No active item to delete");
    }
    dispatch(await deleteItem(activeItem.id));
    setDeleteConfirmationModalOpen(false);
  };

  return (
    <>
      {state.loadingItems == true && (
        <Box
          sx={{ width: 1, display: "flex", justifyContent: "center", mt: 10 }}
        >
          <Loader />
        </Box>
      )}
      {!state.loadingItems && !state.items.length ? (
        <NoItemsState toggleDrawerOpen={toggleDrawerOpen} />
      ) : null}
      {!state.loadingItems && state.items.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Your Items</Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={() => handleEditClick(null)}
            >
              Add Item
            </Button>
          </Box>
          <Stack>
            {state.items.map((item) => (
              <ItemsListRow
                key={`item_row_${item.id}`}
                item={item}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </Stack>
        </>
      ) : null}
      <DeleteItemConfirmationModal
        open={deleteConfirmationModalOpen}
        handleCancel={() => setDeleteConfirmationModalOpen(false)}
        handleContinue={handleContinueDelete}
      />
      {isDrawerMounted && (
        <ItemEditDrawer
          isOpen={isDrawerOpen}
          toggleOpen={toggleDrawerOpen}
          item={activeItem}
        />
      )}
    </>
  );
};

export default ItemsList;
