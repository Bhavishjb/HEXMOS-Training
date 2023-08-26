import React, { useEffect, useState } from 'react';
import PollsTable from './PollsTable';
import handleQid from './HandlQid';
function MainComponent() {
  
  return (
    <>
    <PollsTable handleQid={handleQid} />
    </>
  );
}

export default MainComponent;
