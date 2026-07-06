import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
} from '@mui/material';
import {
  savePoint,
  saveLine,
  savePolygon,
  deletePoint,
  deleteLine,
  deletePolygon,
  getPoints,
  getLines,
  getPolygons,
} from '../services/drawingService';
import WKT from 'ol/format/WKT';

function DrawingToolbar({
  drawType,
  setDrawType,
  vectorSource,
  lastFeature,
  selectedFeature,
  showSnackbar,
}) {
  const loadFeatures = (data, type, format) => {
    data.forEach((item) => {
      const feature = format.readFeature(item.geometry);

      feature.set('id', item.id);
      feature.set('type', type);

      vectorSource.current.addFeature(feature);
    });
  };
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
      }}
    >
      <ToggleButtonGroup
        value={drawType}
        exclusive
        onChange={(e, value) => setDrawType(value)}
      >
        <ToggleButton value="Point">📍 Point</ToggleButton>
        <ToggleButton value="LineString">📏 Line</ToggleButton>
        <ToggleButton value="Polygon">⬡ Polygon</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="row" spacing={1}>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => setDrawType(null)}
        >
          ⏹ Çizimi Durdur
        </Button>

        <Button
          color="error"
          variant="outlined"
          onClick={() => vectorSource.current.clear()}
        >
          🗑 Haritayı Temizle
        </Button>

        <Button
          color="error"
          variant="outlined"
          onClick={async () => {
            if (!selectedFeature) {
              showSnackbar('Önce haritadan bir çizim seç.', 'warning');
              return;
            }

            console.log('Seçilen Feature:', selectedFeature);
            console.log('Feature id:', selectedFeature.get('id'));
            console.log('Feature type:', selectedFeature.get('type'));

            const id = selectedFeature.get('id');
            const type = selectedFeature.get('type');

            if (!id) {
              showSnackbar(
                'Bu çizim henüz veritabanına kaydedilmemiş.',
                'warning',
              );
              return;
            }
            try {
              console.log('Type:', type);
              console.log('Id:', id);

              switch (type) {
                case 'Point':
                  console.log('deletePoint');
                  await deletePoint(id);
                  break;

                case 'LineString':
                  console.log('deleteLine');
                  await deleteLine(id);
                  break;

                case 'Polygon':
                  console.log('deletePolygon');
                  await deletePolygon(id);
                  break;
              }

              showSnackbar("Çizim başarıyla silindi.", "success");

              vectorSource.current.removeFeature(selectedFeature);
            } catch (error) {
              console.log(error.response);
              console.log(error);
              showSnackbar("Silme işlemi başarısız.", "error");
            }
          }}
        >
          ❌ Seçili Çizimi Sil
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={async () => {
            try {
              // Aynı çizimleri tekrar tekrar eklememek için
              vectorSource.current.clear();

              const format = new WKT();

              const points = await getPoints();
              loadFeatures(points.data, 'Point', format);

              const lines = await getLines();
              loadFeatures(lines.data, 'LineString', format);

              const polygons = await getPolygons();
              loadFeatures(polygons.data, 'Polygon', format);

              showSnackbar("Çizimler başarıyla yüklendi.", "success");
            } catch (error) {
              console.log(error);
              showSnackbar("Çizimler yüklenirken hata oluştu.", "error");
            }
          }}
        >
          📂 Çizimleri Yükle
        </Button>

        <Button
          color="success"
          variant="contained"
          onClick={async () => {
            console.log('lastFeature:', lastFeature);

            if (!lastFeature) {
              showSnackbar('Önce çizim yapınız.', 'warning');
              return;
            }

            try {
              let response;

              switch (lastFeature.type) {
                case 'Point':
                  response = await savePoint(lastFeature.geometry);
                  break;

                case 'LineString':
                  response = await saveLine(lastFeature.geometry);
                  break;

                case 'Polygon':
                  response = await savePolygon(lastFeature.geometry);
                  break;
              }
              console.log('Response:', response.data);
              console.log('Selected Feature:', selectedFeature);

              selectedFeature.set('id', response.data.id);
              selectedFeature.set('type', lastFeature.type);

              console.log('Feature id:', selectedFeature.get('id'));
              console.log('Feature type:', selectedFeature.get('type'));

              showSnackbar('Çizim başarıyla kaydedildi.', 'success');
            } catch (error) {
              console.log(error);

              showSnackbar('Kayıt sırasında hata oluştu.', 'error');
            }
          }}
        >
          💾 Kaydet
        </Button>
      </Stack>
    </Paper>
  );
}

export default DrawingToolbar;
