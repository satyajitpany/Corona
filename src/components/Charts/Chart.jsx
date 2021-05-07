import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Charts.module.css'
export const Chart = ({data:{confirmed,deaths,recovered},country}) => {
    const [dailyData, setDalyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDalyData(await fetchDailyData());
        }
        //console.log("length of daily data is",dailyData)
        fetchAPI();
    },[]);

    const lineChart = (
        dailyData.length
        ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    
                    datasets: [{
                        data:dailyData.map(({ confirmed }) => confirmed),
                        label:"Infected",
                        borderColor:"#3333ff",
                        fill:true,
                    }, {
                        data:dailyData.map(({ deaths }) => deaths),
                        label:"Infected",
                        borderColor:"#red",
                        backgroundColor:'rgba(255,0,0,0.5)',
                        fill:true,
                    }],
                }}

            />) : null
    );

    const barChart = (
       confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );

    return (
        <div>
    <div className={styles.container}>
    {country ? barChart: lineChart}

    </div>
        </div>
    )
}
