import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./App.css";
import ItemsList from "./components/ItemsList";
import NavBar from "./components/NavBar";
import Store from "./context";

function App() {
  return (
    <Store>
      <Box sx={{ overflow: "hidden", maxWidth: 1 }}>
        <NavBar />
        <Container fixed sx={{ pt: 4 }}>
          <ItemsList />
        </Container>
      </Box>
    </Store>
  );
}

export default App;
