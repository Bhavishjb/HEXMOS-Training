import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import './Home.css';
import { FilterContext } from './Home';

function PollsTable({ handleQid }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let { qid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredData, setFilteredData } = useContext(FilterContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!filteredData.length) {
          response = await fetch('http://127.0.0.1:8000/polls/get_or_post_polls/');
        } else {
          const tags = filteredData.join(',');
          const url = `http://127.0.0.1:8000/polls/get_polls_by_tags/?tags=${tags}`;
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filteredData]);

  const handleQuestionClick = (event, qid) => {
    event.preventDefault();
    setSearchParams({ id: qid });
    handleQid(qid);
    navigate(`/polldetails/${qid}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tableOfPolls" style={{ marginTop: '10%' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Poll Question</th>
            <th>Total Votes</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td
                onClick={(event) => handleQuestionClick(event, item.id)}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {item.Question}
              </td>
              <td>{Object.values(item.OptionVote).reduce((a, b) => a + b, 0)}</td>
              <td>{item.Tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PollsTable;
