import React, { useState, useEffect } from 'react';

const Sample=()=> {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Start");
  },[]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Button 1</button>
    </>
  );
}

export default Sample;
