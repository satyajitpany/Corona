import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/IN';
export const fetchData = async (country) => {
    let changeableURL=url;

    if(country){
        changeableURL=`https://covid19.mathdro.id/api/countries/${country}`;
    }

    try {
        const { data: {confirmed,recovered,deaths,lastUpdate} } = await axios.get(changeableURL);
        return {confirmed,recovered,deaths,lastUpdate};
    } catch (error) {

    }

}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get("https://covid19.mathdro.id/api/daily");
        const modifiedData=data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,
        }))
        return modifiedData;
        
    } catch (error) {

    }

}

export const fetchCountries = async () => {
    try {
        const {data:{countries}} = await axios.get("https://covid19.mathdro.id/api/countries");
        
        return countries.map((country)=>country.name);
        
    } catch (error) {

    }

}