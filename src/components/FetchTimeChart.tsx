import React, { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  type ChartData,
  Tooltip,
} from 'chart.js';

type Props = {

}


export default function FetchTimeChart(props: Props) {

  const [url, setUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRegistered, setIsRegistered] = React.useState(false);


  const [data, setData] = React.useState<{
    name: string;
    fetchTimeMs: number;
  }[]>([]);

  useEffect(() => {
    ChartJS.register(
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      Tooltip
    );
    setIsRegistered(true);
  }, []);

  if (!isRegistered) return <></>;

  const fetchData = async () => {
    if (!url) return;
    setIsLoading(true);
    try {
      let data = [];
      for (let i = 0; i < 30; i++) {
        const response = await fetch(url);
        const json = await response.json();
        data.push({
          name: (i + 1).toString(),
          fetchTimeMs: json.fetchTimeMs
        })
      }
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  return <div>
    <div style={{
      display: 'flex',
      marginBottom: 20,
      width: "100%"
    }}>
      <input type="text" style={{
        flex: 1,
        marginRight: 10,
        padding: 10,
        fontSize: 16,
      }}
        placeholder='<api-gateway-url>/test/url?=<url_to_fetch>'
        value={url} onChange={(e) => {
          setUrl(e.target.value);
        }} />
      <button style={{
        padding: 10,
        fontSize: 16,
        backgroundColor: isLoading ? '#ccc' : '#007bff',
        border: 'none',
        borderRadius: 5,
        color: 'white',
      }}
        disabled={isLoading}
        onClick={fetchData}
      >Fetch</button>
    </div>
    <Line
      data={{
        labels: data.map(d => d.name),
        datasets: [
          {
            label: 'Fetch Time (ms)',
            data: data.map(d => d.fetchTimeMs),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }
        ]
      }} />
  </div>
}
