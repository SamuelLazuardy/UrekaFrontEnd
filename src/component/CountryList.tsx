import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import "../style/countryList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faGlobe, faLanguage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";

const CountryList:React.FC = () => {

    const navigate = useNavigate()
    const [regions, setRegions] = useState<string[]>([])
    const [language,setLanguage] = useState<string[]>([])
    const [dataCountries,setDataCountrys] = useState<any[]>([])
    const [isVisible, setIsVisible] = useState(false);
    const [filters, setFilters] = useState({
        country: '',
        region: '',
        languages: '',
      });
    
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setDataCountrys(data)

            const languageData:string[] = data
            .map((country : any) => 
            country.languages ? Object.values(country.languages) : [])
            .flat()
            const uniqueLanguage = [...new Set(languageData)]
            setLanguage(uniqueLanguage)
            console.log(uniqueLanguage);

            const region:string[] = data
            .map((country : any) => 
            country.region ? country.region : null)
            const uniqueRegion = [...new Set(region)]
            setRegions(uniqueRegion)
            console.log(uniqueRegion);

        })
        .catch(error => console.log("error fetching : ",error))
    },[])

    const searchCountries = dataCountries.filter(country =>
        (!filters.country || country.name.common.toLowerCase().includes(filters.country.toLowerCase())) &&
        (!filters.region || country.region.toLowerCase().includes(filters.region.toLowerCase())) 
        &&
        (!filters.languages || Object.values(country.languages || {} as Record<string, string>)
            .some((language) => (language as string).toLowerCase().includes(filters.languages.toLowerCase()))
        )
    );
    
  const filterVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  const handleFormFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const goToContryDetail = (countryName:string) => {
    const encodedName = encodeURIComponent(countryName)
    navigate(`/countrydetail/${encodedName}`)
  };

  if (!dataCountries) {
    return <div>Loading...</div>;
    }


    return <div className="countryList">
        <div className="formContainer">
        <div className="form">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input
            className="input"
            type="text"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            placeholder="Search..."
         />
        </div>

            <form className="filterForm" onSubmit={handleFormFilterSubmit}>
            <button className="filter" type="submit" onClick={filterVisibility}><FontAwesomeIcon icon={faFilter}/></button>
            {isVisible && (
            <div className="filterBox">
                <p>Filter by</p>

            <p><FontAwesomeIcon icon={faGlobe} />    Region</p>    
            <select
                name="region"
                value={filters.region}
                onChange={handleSelectChange}>
                <option value="">Select a Region</option>
                    {regions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>))}
            </select>

            <p><FontAwesomeIcon icon={faLanguage} />    Language</p>
            <select
                name="languages"
                value={filters.languages}
                onChange={handleSelectChange}>
                <option value="">Select a Language</option>
                    {language.map((language) => (
                    <option key={language} value={language}>
                        {language}
                    </option>))}
            </select>
            </div>
            )}
            </form>
        </div>

        <div className="countryContainer">
        {searchCountries.map((data, index) => (
            <div key={index} className="country">
                <div className="flag">
                    <img src={data.flags.png}/>
                </div>
                <div className="detail">
                    <p>{data.name?.common}</p>
                    <button className="learnButton" onClick={() => goToContryDetail(data.name?.common || '')}>Learn More</button>
                </div>
            </div>
        ))}
        </div>
    </div>

}

export default CountryList

