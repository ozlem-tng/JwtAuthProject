import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import WKT from "ol/format/WKT";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";

function MapView({
  drawType,
  vectorSource,
  setLastFeature,
  setSelectedFeature,
}) {
  const mapRef = useRef();
  const mapInstance = useRef();
  const drawRef = useRef();
  const selectRef = useRef();

  // Haritayı sadece 1 kez oluştur
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),

        new VectorLayer({
          source: vectorSource.current,
        }),
      ],

      view: new View({
        center: fromLonLat([35.2433, 38.9637]),
        zoom: 6,
      }),
    });

    mapInstance.current = map;
    

    selectRef.current = new Select({
  condition: click,
});

selectRef.current.on("select", (event) => {

  if (event.selected.length > 0) {
    console.log("Seçildi:", event.selected[0]);
    setSelectedFeature(event.selected[0]);
  } else {
    console.log("Seçim kaldırıldı");
    setSelectedFeature(null);
  }

});

map.addInteraction(selectRef.current);

    return () => map.setTarget(undefined);
  }, []);

  // Çizim modu değişince
  useEffect(() => {
    if (!mapInstance.current) return;

    if (drawRef.current) {
      mapInstance.current.removeInteraction(drawRef.current);
      drawRef.current = null;
    }

    if (!drawType) return;

    drawRef.current = new Draw({
      source: vectorSource.current,
      type: drawType,
    });

    drawRef.current.on("drawend", (event) => {

    const wkt = new WKT().writeFeature(event.feature);

    const drawing = {
        type: drawType,
        geometry: wkt
    };

    console.log("Drawing:", drawing);

    setLastFeature(drawing);

});

    mapInstance.current.addInteraction(drawRef.current);
  }, [drawType]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "calc(100vh - 160px)",
        borderRadius: "12px",
      }}
    />
  );
}

export default MapView;