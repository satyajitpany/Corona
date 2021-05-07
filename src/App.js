import React  from 'react'
import { fetchData } from './api/index';
import image from './images/corona.png';
import styles from './App.module.css';
import {Cards} from './components/Cards/Cards';
import {Chart} from './components/Charts/Chart';
import {CountryPicker} from './components/CountryPicker/CountryPicker';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default App;