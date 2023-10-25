import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

export default function PoemCard({ result }) {
  return (
    <Card sx={{ height: 260, m: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="div">
            {result["Poem Line"]}
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" component="div">
              {result["Metaphor Count"]}
            </Typography>
            <Typography variant="caption" component="div">
              Metaphor Count
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <AutoStoriesIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {result["Poem Name"]}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <HistoryEduIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {result["Poet"]}, {result["Year"]}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary"></Typography>
        {result["Has Metaphor"] === "true" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="div">
              {result["Metaphoric Terms"]}
            </Typography>
            <Typography variant="caption">
              Metaphor Type - {result["Metaphor Type"]}
            </Typography>
            <Typography variant="body2">
              Source Domain - {result["Source Domain"]}
              <br />
              Target Domain - {result["Target Domain"]}
            </Typography>
            <Typography variant="body2"> Interpretation - {result["Interpretation"]}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
