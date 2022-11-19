import { useEffect, useState } from 'react';


function Recipe({recipes}) {
  
  useEffect(() => {
    
  }, [])

  return (
    <>
      {recipes && recipes.map(el => <p>{el.title}</p>)}
    </> 
  );
}

export default Recipe
