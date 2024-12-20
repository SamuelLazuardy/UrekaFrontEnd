import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../style/countryDetail.css"
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";

const CountryDetail :React.FC = () => {

        const [dataCountry,setDataCountry] = useState<any>(null)
        const {countryName} = useParams<{countryName?:string}>()
        const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
        const [zoomLevel, setZoomLevel] = useState(4);
        const [mapCenterCapital, setMapCenterCapital] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
        const [zoomLevelCapital, setZoomLevelCapital] = useState(4);

        useEffect(() => {
            if (!countryName) {
                console.error("Country name is undefined.");
                return;
            }

            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                if (!data || !Array.isArray(data) || data.length === 0) {
                    console.error("No country data found.");
                    return;
                }

                const country = data.find(
                    (item: any) => item.name.common.toLowerCase() === countryName.toLowerCase()
                );

                if (!country) {
                    console.error("Exact country match not found.");
                    return;
                }

                console.log(data); 
                setDataCountry(country)

                if (country.latlng) {
                    const [lat, lng] = country.latlng;
                    setMapCenter({ lat, lng });
                    setZoomLevel(4);
                }

                if (country.capitalInfo.latlng) {
                    const [lat, lng] = country.capitalInfo.latlng;
                    setMapCenterCapital({ lat, lng });
                    setZoomLevelCapital(10);
                }
            })
            .catch(error => console.log("error fetching : ",error))
        },[countryName])
    
        if (!dataCountry) {
            return <div>Loading...</div>;
        }

    return <>
        <div className="containerContryDetail">
        <h1>{dataCountry.name.common}</h1>
        <LoadScript googleMapsApiKey="AIzaSyBvsGhBhqlt1UJuMl4m9KNwgi53vI9Mz-I">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    {dataCountry && (
                        <Marker
                            position={mapCenter}
                            onClick={() => console.log(`Marker for ${dataCountry.name.common}`)}
                        />
                    )}

                    {dataCountry && (
                        <InfoWindow position={mapCenter}>
                            <div>
                                <h2>{dataCountry.name.common}</h2>
                                <p>Capital: {dataCountry.capital}</p>
                                <p>Region: {dataCountry.region}</p>
                                <p>Population: {dataCountry.population}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
        </LoadScript>
        <hr/>
        <div className="contentCountryContiner">
            <div className="subContent">
                <p className="subTitle">About {dataCountry.name.common}</p>
                <div className="aboutCountryConteiner">
                <div className="aboutCountry">
                <img className="coatOfArms" src={dataCountry.coatOfArms.png} alt="" />
                <div>
                    <p>Common Name : {dataCountry.name.common}</p>
                    <p>Official Name : {dataCountry.name.official}</p>
                    <p>Re : {dataCountry.region}</p>
                    <p>Sub Region : {dataCountry.subregion}</p>
                    <p>Population : {dataCountry.population}</p>
                </div>
                </div>
                <div className="aboutCountry">
                <img className="flagDetail" src={dataCountry.flags.png} alt="" />
                <div>
                <p>Independent: {dataCountry.independent ? "Yes" : "No"}</p>
                <p>
                    Languages:{" "}
                    {dataCountry.languages ? Object.values(dataCountry.languages).join(", ") : "No languages listed"}
                </p>
                <p>Capital City: {dataCountry.capital ? dataCountry.capital[0] : "No capital"}</p>
                <p>Start Of Week: {dataCountry.startOfWeek}</p>
            </div>
                </div>
                </div>
            </div>
            <div className="capitalContent">
            {dataCountry.capital?.map((capital:string) => (
                <div>
                <hr />
                <p className="subTitle">{capital}</p>
                <div className="aboutCapital">
                    <LoadScript googleMapsApiKey="AIzaSyBvsGhBhqlt1UJuMl4m9KNwgi53vI9Mz-I">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "30rem"}}
                        center={mapCenterCapital}
                        zoom={zoomLevelCapital}>
                        {dataCountry && (
                        <Marker
                            position={mapCenter}
                            onClick={() => console.log(`Marker for ${dataCountry.name.common}`)}/>
                        )}
                    </GoogleMap>
                    </LoadScript>
                </div>
            </div>
            ))}
            </div>
        </div>
    </div>
    </> 

}

export default CountryDetail
