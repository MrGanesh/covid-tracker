import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { prettyPrintStat, sortData } from './Util';
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"
function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setCountry] = useState('worldwide');
  const [tableData, setTableData] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796
  })
  const [mapZoom, setMapZoom] = useState(3)
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(res => res.json())
        .then((data) => {

          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ))
          const sortedData = sortData(data);
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }
    getCountriesData();
  }, [])
  //https://disease.sh/v3/covid-19/countries

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;


    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.lang])
        setMapZoom(4)
        console.log()
      })
  }

  // console.log("coountry >>>> ", country)
  console.log("coountrInfo >>>> ", countryInfo)
  // console.log("coountries >>>> ", countries)

  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_droppdown">
            <Select variant="outlined"
              value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox isRed active={casesType === 'cases'} onClick={e => setCasesType('cases')} title="CoronaVirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active={casesType === 'recovered'} onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox active={casesType === 'deaths'} onClick={e => setCasesType('deaths')} title="Death" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        <Map

          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Countries</h3>
          <Table countries={tableData} />
        </CardContent>
        <CardContent>
          <h3 className="app_graphTitle">Worldwide New {casesType}</h3>
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
