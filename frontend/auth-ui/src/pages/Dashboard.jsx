import { Box, Paper, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>

      <Paper
        elevation={3}
        sx={{
          p:3,
          mb:3,
          borderRadius:3
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Hoş Geldiniz 👋
        </Typography>

        <Typography color="text.secondary">
          Point, Line veya Polygon seçerek harita üzerinde çizim yapabilirsiniz.
        </Typography>

      </Paper>

      <Paper
        elevation={3}
        sx={{
          height:"75vh",
          borderRadius:3,
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >

        <Typography
          variant="h4"
          color="text.secondary"
        >
          🌍 OpenLayers Haritası Buraya Gelecek
        </Typography>

      </Paper>

    </Box>
  );
}

export default Dashboard;