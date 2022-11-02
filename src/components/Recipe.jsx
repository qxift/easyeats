import { useEffect, useState } from 'react';


function Recipe({recipes}) {
  
  useEffect(() => {
    
  }, [])

  return (
    <>
      {recipes && recipes.map(el => <p>{el}</p>)}
    </> 
  );
}

export default Recipe
