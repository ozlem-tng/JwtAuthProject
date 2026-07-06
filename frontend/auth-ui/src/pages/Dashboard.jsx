import { Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import DrawingToolbar from '../components/DrawingToolbar';
import MapView from '../map/MapView';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Dashboard() {
  const [drawType, setDrawType] = useState(null);
  const vectorSource = useRef(new VectorSource());
  const [lastFeature, setLastFeature] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <DrawingToolbar
        drawType={drawType}
        setDrawType={setDrawType}
        vectorSource={vectorSource}
        lastFeature={lastFeature}
        selectedFeature={selectedFeature}
        showSnackbar={showSnackbar}
      />

      <Typography sx={{ mb: 2 }}>
        Aktif Mod :<strong> {drawType || 'Yok'}</strong>
      </Typography>

      <MapView
        drawType={drawType}
        vectorSource={vectorSource}
        setLastFeature={setLastFeature}
        setSelectedFeature={setSelectedFeature}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
