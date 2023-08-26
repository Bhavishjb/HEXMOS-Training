import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import { FilterContext } from './Home';
import {MBtn} from './Buttons';

function FilterComp() {
  const { filteredData, setFilteredData } = useContext(FilterContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/polls/tags/")
      .then(response => response.json())
      .then(data => setTags(data.Tags.map(tag => ({ value: tag, checked: false }))))
      .catch(error => console.error(error));
  }, []);

  const handleFilter = () => {
    const filteredTags = tags.filter(tag => tag.checked).map(tag => tag.value);
    setFilteredData(filteredTags);
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    setTags(prevTags =>
      prevTags.map(tag => {
        if (tag.value === value) {
          return { ...tag, checked: checked };
        }
        return tag;
      })
    );
  };

  return (
    <div className="pollFilter">
      {tags.map(tag => (
        <div className="checkbox" key={tag.value}>
          <input
            type="checkbox"
            name="tags"
            id={tag.value}
            value={tag.value}
            className="smallcheckbox"
            style={{ width: "18px", height: "18px" }}
            checked={tag.checked}
            onChange={handleTagChange}
          />
          <label htmlFor={tag.value} style={{ padding: "20px" }}>{tag.value}</label>
        </div>
      ))}
      {/* <div className="filtertagsbtn">
      <button onClick={handleFilter}>Filter by tags</button>
      </div> */}
      
        <MBtn onClick={handleFilter} label={"Filter by tags"}/>
    </div>
  );
}

export default FilterComp;
