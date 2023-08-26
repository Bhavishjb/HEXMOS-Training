import React, { useState, useEffect } from 'react';
import Heading from './Heading';
import { useNavigate, useParams } from 'react-router-dom';
import './PollDetail.css';
import { Chart } from 'react-google-charts';

import {MBtn,SBtn} from './Buttons';

function PollDetail() {
  const navigate = useNavigate();
  const { qid } = useParams();
  const [data, setData] = useState({ Question: '', Choice: {}, Tags: [] });
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/polls/get_or_put_inc/${qid}/`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch poll data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [qid]);

  useEffect(() => {
    const chartDataArray = Object.entries(data.Choice).map(([option, votes]) => [option, votes]);
    setChartData([['Option', 'Votes'], ...chartDataArray]);
  }, [data]);

  const handleVoteClick = () => {
    navigate(`/vote/${qid}`);
  };

  const handleHomeClick = () => {
    navigate(`/`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container" style={{ height: 'auto' }}>
        <Heading />
        <div style={{ display: 'flex' }}>
          <div className="container2" style={{ marginLeft: '50px' }}>
            <div className="question">
              <b>{data.Question}</b>
            </div>
            {/* <div style={{ margin: '20px 0px', width: '40%' }} className="viewPollButton"> */}
              
              <MBtn onClick={handleVoteClick} label={"Vote on this poll"}/>
              <div style={{ margin: '20px 0px' }} />
              <SBtn onClick={()=>navigate("/")} label={"Home"}/><br/>
            {/* </div> */}
            <div className="votesTable">
              <table style={{ width: '600px' }}>
                <thead>
                  <tr>
                    <th width="5%">Number</th>
                    <th width="25%">Option</th>
                    <th width="70%">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.Choice).map(([option, votes], index) => (
                    <tr key={option}>
                      <td width="5%">{index + 1}</td>
                      <td width="25%">{option}</td>
                      <td width="70%">{votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ margin: '10px 0px' }} className="Tags">
              Tags: {data.Tags.join(', ')}
            </div>
          </div>
          <div className="pie-chart" style={{ width: '650px', marginLeft: '200px', marginTop: '125px' }}>
            <Chart
              chartType="PieChart"
              data={chartData}
              options={{
                title: 'Votes by Option',
                is3D: false,
              }}
              width="90%"
              height="350px"
              role="img"
              aria-label="Votes by Option"
            />

            <div style={{ marginLeft: '25%' }}>
              <b>Total Votes: {Object.values(data.Choice).reduce((para1, para2) => para1 + para2, 0)}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollDetail;
