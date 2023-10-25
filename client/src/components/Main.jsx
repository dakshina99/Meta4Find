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
  Card,
  CardContent,
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
  const [aggr, setAggr] = React.useState([]);
  const [aggr2, setAggr2] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDocs([]);
    const response = await search(searchParameter);
    if (response.status === 200) {
      setIsLoading(false);
      console.log(response.data);
      // console.log(response.data.aggregations.MetaphorCount.buckets[0].doc_count);
      setAggr(response.data.aggregations.MetaphorCount.buckets)
      setAggr2(response.data.aggregations.PoemName.buckets)
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
      <Box sx={{ display: "flex", mt: 2, mb:5, ml: 6, mr:6, justifyContent:"space-between" }}>
        {aggr[0] && <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Summary
              </Typography>
              <Typography variant="body2" key={0}>
                Metophor Available Results: {aggr[0]? aggr[0]?.doc_count: 0}
              </Typography>
              <Typography variant="body2" key={1}>
                Metophor Not Available Results: {aggr[1]? aggr[1]?.doc_count: 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>}
        {!aggr[0] && <Box sx={{flexGrow:1}}></Box>}
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
        {aggr2[0] && <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Summary
              </Typography>
              {
                aggr2?.map((doc, ind) => (
                  <Typography variant="body2" key={ind}>
                    {doc.key}: {doc.doc_count}
                  </Typography>
                ))
              }
            </CardContent>
          </Card>
        </Box>}
        {!aggr2[0] && <Box sx={{flexGrow:1}}></Box>}
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
            variant="h5"
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
