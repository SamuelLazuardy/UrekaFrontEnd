import { useEffect, useState } from "react";
import "../style/home.css"
import chinaImage from "../assets/premium_photo-1661941498559-dcc4967731fc.jpg"
import indiaImage from "../assets/taj-mahal-india-1.jpg"
import usaImage from "../assets/usa-sonnenaufgang-ucc88ber-dem-grand-canyon-usa-frederic-prochasson-fotolia.jpg"
import indonesiaImage from "../assets/f4024c571e5e09ce5e4049bc181500b1-borobudur-temple.jpg"
import pakistanImage from "../assets/cropped-shutterstock_1444779923-scaled.jpg"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const Home: React.FC = () => {

    const [largestCountry, setLargestCountry] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUrl,setImageUrl] = useState<string>("chinaImage")
    const [countryDescription, setCountryDescription] = useState([
        {
          name: "China",
          des: "China is the most populated country in the world with over 1.4447 billion",
        },
        {
          name: "India",
          des: "India is the second most populated country with a population exceeding 1.366 billion.",
        },
        {
          name: "USA",
          des: "The USA has a population of around 331 million people.",
        },
        {
          name: "Indonesia",
          des: "Indonesia is the fourth most populated country with over 273 million people.",
        },
        {
          name: "Pakistan",
          des: "Pakistan has a population of around 225 million people, making it the fifth most populated.",
        },
      ]);

    const images = [chinaImage, indiaImage, usaImage, indonesiaImage, pakistanImage];
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const sortedCountries = data.sort((a: any, b: any) => b.population - a.population).slice(0,5)
                setLargestCountry(sortedCountries)
            })
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    const moveLeft = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? 4 : prevIndex - 1
        );
    };

    const moveRight = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 4 ? 0 : prevIndex + 1
        );
    };
    const changeIndex = (index : number) => {
        setCurrentIndex(index);
    }

    const navigate = useNavigate()

    const goToList = () => {
        navigate('/countryList')
    }

    const goToAbout = () => {
        navigate('/about')
    }

    return <div className="container">
        <div className="topHome">
            <div className="title">
                <h1>NeWorld</h1>
                <p>Know Your Earth, Know Your Country</p>
            </div>
        </div>

        <div className="pupolatedCountryContainer"
        style={{ "--background-url": `url(${images[currentIndex]})`} as React.CSSProperties}>
        
        <div className="countryContainer">
                <div className="contentContainer">
                    <div className="countryLeftContainer">
                        <div className="countryDes">
                            <p  className="countryName">{countryDescription[currentIndex].name}</p>
                            <p  className="countryInfo">{countryDescription[currentIndex].des}</p>
                            <div className="buttonContainer">
                                <button className="buttonCarousel" onClick={moveLeft}><FontAwesomeIcon icon={faArrowLeft} /></button>
                                <button className="buttonCarousel" onClick={moveRight}><FontAwesomeIcon icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="contentImage">
                        <p className="populatedText">Most Populated Country</p>
                        <div className="imageContainer"
                            style={{transform: `translateX(-${currentIndex * 240}px)`}}>
                            <img key="0" src={chinaImage} onClick={() => changeIndex(0)} className="countryImage"/>
                            <img key="1" src={indiaImage} onClick={() => changeIndex(1)} className="countryImage"/>
                            <img key="2" src={usaImage} onClick={() => changeIndex(2)} className="countryImage"/>
                            <img key="3" src={indonesiaImage} onClick={() => changeIndex(3)} className="countryImage"/>
                            <img key="4" src={pakistanImage} onClick={() => changeIndex(4)} className="countryImage"/>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div className="featurePage">
            <p className="featureTitle">Our Website Feature</p>
            <div className="featureContainer">
            <div className="featureDetail">
                <div>
                <p className="featureName">Country List</p>
                <p className="featureDes">Berisikan semua informasi tentang semua negara</p>
                </div>
                <div className="featureButtonContainer">
                <button onClick={() => goToList()} className="featureButton">See Feature</button>
                </div>
            </div>
            <div  className="featureDetail">
                <div>
                <p className="featureName">Country Information</p>
                <p className="featureDes">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
                </div>
                <div className="featureButtonContainer">
                <button onClick={() => goToList()} className="featureButton">See Feature</button>
                </div>
            </div>
            <div  className="featureDetail">
                <div>
                <p className="featureName">My Country</p>
                <p className="featureDes">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
                </div>
                <div className="featureButtonContainer">
                <button onClick={() => goToAbout()} className="featureButton">See Feature</button>
                </div>
            </div>
            </div>

        </div>
        
    </div>
}

export default Home