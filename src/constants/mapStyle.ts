import { COLORS } from "./theme";

const mapStyle = [
  // Estilos generales del mapa
  {
    elementType: "geometry",
    stylers: [
      { color: "#f5f5f5" }, // Fondo claro
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      { visibility: "off" }, // Ocultar íconos para mayor claridad
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      { color: "#616161" }, // Texto gris oscuro
    ],
  },
  
  // Límites administrativos
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      { color: "#c9c9c9" }, // Líneas administrativas en gris claro
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.Description },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.Description }, 
    ],
  },

  // Puntos de interés (POI)
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#757575" }, // Etiquetas de POI en gris
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#a5d6a7" }, // Parques en verde claro
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#388e3c" }, // Etiquetas de parques en verde oscuro
    ],
  },

  // Carreteras
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      { color: "#ffffff" }, // Carreteras principales en blanco
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.Description }, // Etiquetas de carreteras en negro
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" }, // Carreteras arteriales en blanco
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" }, // Autopistas en blanco
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.Description }, // Etiquetas de carreteras locales en negro
    ],
  },

  // Transporte público
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#757575" }, // Etiquetas de transporte en gris
    ],
  },

  // Agua
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#c9c9c9" }, // Agua en gris claro
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      { color: COLORS.Description }, // Etiquetas de agua en negro
    ],
  },
  
  // Mejoras Visuales Adicionales
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      { visibility: "simplified" }, // Simplificar íconos de parques
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#b6b6b6" }, // Bordes de carreteras
      { weight: 0.5 }, // Grosor de las líneas
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      { color: "#a3dafd" }, // Agua en azul claro
    ],
  },
];

export default mapStyle;