import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

// URL e chiavi API
const Url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apikey = "&appid=be172ebdf6af4322c787e9086b1f58c4";
const apiKeyUnsplash = "GJbpYoqwuuPBCuOsa61oHldVu-hPECeCmRz_z-lzd0E";

const Weather = function ({ searchValue }) {
  const [weatherCity, setWeatherCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const getCityImage = (searchValue) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${searchValue}&client_id=${apiKeyUnsplash}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular); // Imposta l'URL dell'immagine
        } else {
          setImageUrl(
            "https://www.halleyweb.com/c061049/immagini/slideshow/foto2.jpg"
          ); // Fallback image
        }
      })
      .catch((error) => {
        console.log("Errore nel recupero immagine:", error);
        setImageUrl(
          "https://www.halleyweb.com/c061049/immagini/slideshow/foto2.jpg"
        ); // Fallback image in caso di errore
      });
  };

  useEffect(() => {
    if (searchValue) {
      getW();
    }
  }, [searchValue]);

  const getW = function () {
    setLoading(true);
    fetch(Url + searchValue + apikey)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dati ");
        }
      })
      .then((data) => {
        setWeatherCity(data);
        getCityImage(searchValue); // Carica l'immagine della città
        setLoading(false);
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };

  const getWeatherBgClass = (main) => {
    switch (main) {
      case "Clear":
        return "bg-warning text-dark"; // giallo
      case "Clouds":
        return "bg-secondary text-white"; // grigio
      case "Rain":
        return "bg-primary text-white"; // blu
      case "Snow":
        return "bg-info text-dark"; // azzurrino
      case "Thunderstorm":
        return "bg-danger text-white"; // rosso
      case "Drizzle":
        return "bg-info text-dark"; // neve leggera
      case "Fog":
      case "Mist":
      case "Haze":
        return "bg-light text-dark"; // grigino
      default:
        return "bg-dark text-white"; // neutro
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      ) : (
        <Card className=" border-0 ">
          <Card.Header
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              color: "white",
              position: "relative",
            }}
          >
            <div className="gradient-overlay"></div>
            <div className=" d-flex flex-column justify-content-end h-100 header-content">
              <div className=" d-flex">
                <i className="bi bi-geo-alt-fill fs-3 text-shadow text-danger"></i>{" "}
                &nbsp;
                <h1 className=" text-light text-shadow">
                  {weatherCity.name}
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}.png`}
                    alt={weatherCity.weather[0].description}
                  />
                </h1>
              </div>

              <div>
                <p className=" text-shadow ">
                  Lat: {weatherCity.coord.lat} - Lon: {weatherCity.coord.lon}
                </p>
              </div>
            </div>
          </Card.Header>

          <Card.Body
            className={getWeatherBgClass(weatherCity.weather?.[0]?.main)}
          >
            <div className=" d-flex align-items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`}
                alt={weatherCity.weather[0].description}
              />
              <span className=" fs-4 font-monospace">
                {weatherCity.weather[0].description}
              </span>
            </div>

            <div className="">
              <p>
                {" "}
                <i class="bi bi-thermometer-half fs-4"></i>&nbsp;
                <strong>Temperature:</strong> {weatherCity.main.temp} °
              </p>
              <p>
                <i class="bi bi-moisture fs-4"></i> &nbsp;
                <strong>Humidity:</strong> {weatherCity.main.humidity}%
              </p>
              <p>
                <i class="bi bi-wind fs-4"></i> &nbsp;
                <strong>Wind Speed:</strong> {weatherCity.wind.speed} MPH
              </p>
              <p>
                <i class="bi bi-clouds-fill fs-4"></i> &nbsp;{" "}
                <strong>Cloudiness:</strong> {weatherCity.clouds.all}%
              </p>
              <p>
                <i class="bi bi-cloud-rain-heavy-fill fs-4"></i> &nbsp;{" "}
                <strong>Rain:</strong> {weatherCity.rain?.["1h"] ?? 0} mm
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Weather;
