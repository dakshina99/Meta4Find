import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import logoImg from "./logo.png";
import { search } from "../utils/api/elastic_search";
import PoemCard from "./PoemCard";
import Grid from '@mui/material/Unstable_Grid2'; 

function Main() {
  const [searchParameter, setSearchParameter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [docs, setDocs] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDocs([]);
    const response = await search(searchParameter);
    if (response.status === 200) {
      setIsLoading(false);
      console.log(response.data);
      setDocs(response.data.hits);
      console.log(docs);
    }
    console.log(searchParameter);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ alignItems: "center", backgroundColor: "#000" }}
        >
          <Toolbar>
            <Avatar alt="Remy Sharp" src={logoImg} sx={{ mr: 1 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Meta4Find
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex", mt: 2, mb:5, justifySelf: "center" }}>
        <Box sx={{ flexGrow: 1 }}> </Box>
        <Box sx={{ alignItems: "center" }}>
          <FormControl sx={{ width: "50ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-search">Search</InputLabel>
            <OutlinedInput
              id="outlined-search"
              label="Search"
              type="search"
              value={searchParameter}
              onChange={(e) => setSearchParameter(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleSubmit}>
                    {<SearchIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="outlined-search">
              Search for Metaphors and Poems
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1 }}> </Box>
      </Box>
      {isLoading && (
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Loading...
        </Typography>
      )}
      {docs.length > 0 && (
        <>
          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
            gutterBottom
          >
            Results
          </Typography>
          <Grid
            container
            spacing={2}
            
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                m:2
              }}
          >
            {docs.map((doc, ind) => (
              <Grid xs={6}><PoemCard key={ind} result={doc._source} /></Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Main;
