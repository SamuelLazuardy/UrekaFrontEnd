import DemaciaMap from "../assets/Untitled.jpg"
import Demacia from "../assets/images (1).jpg"
import Demacia2 from "../assets/cc10e287c015104a024c201ed1a2d8b1.jpg"
import "../style/about.css"
import { useEffect, useState } from "react"

const About:React.FC = () => {

    const [countries, setCountries] = useState<any[]>([]);
    const [japan, setJapan] = useState<any>(null);
    const [china, setChina] = useState<any>(null);
    const [indonesia, setIndonesia] = useState<any>(null);
    const [uk, setUk] = useState<any>(null);
    const [egypt, setEgypt] = useState<any>(null);
    const [russia, setRussia] = useState<any>(null);

    useEffect(() => {
        const countryCodes = "JPN,CHN,IDN,GBR,EGY,RUS";

        fetch(`https://restcountries.com/v3.1/alpha?codes=${countryCodes}`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data); 
                const japanData = data.find((country: any) => country.cca3 === "JPN");
                setJapan(japanData);
                const chinaData = data.find((country: any) => country.cca3 === "CHN");
                setChina(chinaData);
                const indonesiaData = data.find((country: any) => country.cca3 === "IDN");
                setIndonesia(indonesiaData);
                const ukData = data.find((country: any) => country.cca3 === "GBR");
                setUk(ukData);
                const egyptData = data.find((country: any) => country.cca3 === "EGY");
                setEgypt(egyptData);
                const russiaData = data.find((country: any) => country.cca3 === "RUS");
                setRussia(russiaData);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    if (!countries) {
        return <div>Loading...</div>;
    }
    return <>
        <div className="aboutContainer">    
        <div className="myCountryContainer">
        <h1>My Country</h1>
        <img className="aboutCountryImage" src={DemaciaMap} alt="" />
        </div>
        
    <div className="aboutMyCountry">
        <hr/>
        <p className="myCountrySubTitle">About My Country</p>
        <div className="aboutCountryInfo">
            <img className="imageMyCountry" src={Demacia} alt="" />
            <div className="contentAboutMyCountry">
                <p>Name : Demacia</p>
                <p>Capital City : The Great City of Demacia</p>
                <p>Region : Valoran</p>
                <p>Sub Region : West Valoran</p>
            </div>
        </div>
        <hr/>
        <p className="myCountrySubTitle">Why Demacia</p>
        <div className="aboutCountryInfo">
            <img className="imageMyCountry" src={Demacia2} alt="" />
            <div className="contentAbout">
                <p>The reason why I choose Demacia as my country because of the show called Arcane. I think the show is really good and I want to take the inspiration from their universe. The region I pick as my country is Demacia beacause I kinda like magic and the white ornament.</p>
            </div>
        </div>

        <hr/>
        <p className="myCountrySubTitle">6 Country That I Want In My Fictional World</p>
        <div className="sixCountryContainer">
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={china?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose China because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={japan?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose Japan because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={indonesia?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose Indonesia because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={egypt?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose Egypt because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={russia?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose Russia because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
            <div className="sixCountry"> 
                <img className="imageMyCountry" src={uk?.flags.png} alt="" />
                <div className="sixCountryReason">
                    <p>I choose Enland because it rich culture that can make an interesting world in NeWorld</p>
                </div>
            </div>
        </div>

    </div>
    </div>
    </>
}

export default About