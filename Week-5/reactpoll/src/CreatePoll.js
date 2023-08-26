import React, { useState } from 'react';
import './CreatePoll.css';
import Heading from './Heading';
import { useNavigate } from 'react-router-dom';
import {MBtn,LBtn,SBtn} from './Buttons';

function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['','']);
  const [tags, setTags] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  //Handle's add option button
  const handleAddOption = (event) => {
    event.preventDefault();
    setOptions([...options, '']);
  };
  
  //function to handle Remove button
  // const handleRemoveOption = (index) => {
  //   const updatedOptions = options.filter((_, i) => i !== index);
  //   setOptions(updatedOptions);
  // };

  const handleSubmit = async (event) => {
      event.preventDefault();
     if (question.trim() === '') {
       return alert("Please enter a question.");
     }
     if (options.filter(option => option.trim() !== '').length < 2) {
       return alert("Please enter atleast two options.");
     }
     if (tags.trim() === '') {
       return alert("Please enter atleast one tag.");
     }
     //Create's the JSON payload
    const payload = {
      Question: question,
      OptionVote: options.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {}),
      Tags: tags.split(','),//.map((tag) => tag.trim()),
    };

    try {
      const response = await fetch('http://localhost:8000/polls/get_or_post_polls/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("You have Sucessfully Created a Poll")
        // Poll created successfully
        navigate('/');
      } else {
        // Handle error response
        throw new Error('Failed to create poll');
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      // Handle error state or display error message
    }
  };

  return (
    <div className="main-container">
      
      <div className="container" style={{ height: 'auto' }}>
        <Heading />
        <div className="container2 column">
          <div className="form">
            <br/>
            <div style={{ marginleft: '40px'}}>
            <SBtn onClick={()=>navigate("/")} label={"Home"}/>
            <form style={{paddingTop:'20px'}} >
              <div className="form2" >
                <h2>Question</h2>
                <input
                  type="text"
                  placeholder="Type your question here"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />

                <h2>Answer Options</h2>
                {options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(index, event.target.value)
                      }
                      style={{width: '200%'}}
                    />
                    {/* <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button> */}
                  </div>
                ))}
                <br />
                {/* <button style={{ margin: '20px 0px' }} onClick={handleAddOption}>
                  Add Option
                </button> */}
                <>
                <MBtn onClick={handleAddOption} label={"Add Option"}/>
                </>
                <h2>Comma Separated Tags</h2>
                <input
                  type="text"
                  placeholder="Tag1, Tag2, Tag3"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                style={{width: '50%'}}/>
              </div>
                
              <div style={{ margin: '20px 0px' }}>
              <LBtn onClick={handleSubmit} label={"Create Poll"}/>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;