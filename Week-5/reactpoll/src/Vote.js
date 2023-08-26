import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Heading from './Heading';
import './Vote.css';
import { SBtn } from './Buttons';

function Vote() {
  let { qid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pollData, setPollData] = useState({
    id: 0,
    Question: '',
    Choice: {},
    Tags: []
  });
  const [optionSelected, setOptionSelected] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/polls/get_or_put_inc/${qid}/`);
        const data = await response.json();
        setPollData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [qid]);

  const handleVoteClick = async () => {
    try {
      if (optionSelected === '') {
        return alert('Please select an option to vote!');
      }

      const response = await fetch(`http://localhost:8000/polls/get_or_put_inc/${qid}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          incrementOption: optionSelected
        })
      });

      if (response.ok) {
        
        navigate(`/polldetails/${qid}`);
        alert('Voted Successfully!');
      } else {
        throw new Error('Voting failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Voting failed. Please try again later.');
    }
  };

  const handleOptionChange = (event) => {
    setOptionSelected(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <Heading />
        <div className="container2" style={{ marginLeft: '70px', paddingBottom: '40%' }}>
          <div>
            <div>
              <h2>{pollData.Question}</h2>
              <form>
                {Object.entries(pollData.Choice).map(([option, votes]) => (
                  <div key={option}>
                    <input
                      className="checkbox1"
                      type="radio"
                      id={option}
                      value={option}
                      checked={optionSelected === option}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={option}>{`${option}`}</label>
                    <br />
                  </div>
                ))}
                <br />
                <SBtn onClick={handleVoteClick} label={"Vote"}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vote;
