import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import imagePlaceholder from "./web.jpg"; // Ruta de la imagen react.svg en la carpeta assets

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }).on("locationerror", () => {
      console.error("No se pudo obtener la ubicación del usuario.");
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        ¡Estás aquí!
      </Popup>
    </Marker>
  );
}

function HomePage() {
  return (
    <section className="bg-red-500 flex flex-col justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold">ENCUENTRA TU ESPACIO <br/>DE TRABAJO IDEAL</h1>
        <p className="text-md text-slate-400">
          ¡Descubre la revolucionaria plataforma de reserva de espacios de trabajo que cambiará la forma en que interactúas con tus ambientes laborales! Te presentamos "Smap": la herramienta completa para encontrar, reservar y gestionar tus espacios compartidos de manera sencilla y eficiente.
          Te has preguntado cómo sería poder acceder a salas de reuniones, oficinas o aulas de manera rápida y sin complicaciones? Con Smap, ahora es posible. Nuestra plataforma ha sido diseñada para optimizar tu experiencia al buscar y reservar espacios, facilitando la productividad y el encuentro con tu entorno laboral.

          Una de las características más destacadas de Smap es su interacción de mapas. Gracias a esta función, podrás visualizar en un mapa interactivo la ubicación de todos los espacios de trabajo disponibles a tu alrededor. Olvídate de largas búsquedas y tediosas llamadas telefónicas; con tan solo unos clics, encontrarás el espacio ideal que se ajuste a tus necesidades.
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Inicia Ahora
        </Link>

        <div className="map-container mt-6">
          <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </header>
      {/* Sección inferior con 2 columnas */}
      <div className="bg-gray-900 p-10 flex flex-col md:flex-row justify-center items-center w-full">
        {/* Columna 1: Título */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-4">TENEMOS EL LUGAR IDEA PARA TI</h1>
          <p>Encontrar el espacio perfecto para tus necesidades laborales nunca había sido tan sencillo. Con nuestra innovadora plataforma, Smap, te garantizamos que hallarás el lugar ideal para potenciar tu productividad y creatividad.</p>
        </div>
        {/* Columna 2: Imagen */}
        <div className="md:w-1/2 w-full">
          <img src={imagePlaceholder} alt="Imagen de ejemplo" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
  