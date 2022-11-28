import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';


function Recipe({recipes}) {
  
  useEffect(() => {
    
  }, [])

  return (
    <>
      {recipes && recipes.map(el => 
      <Card>
        <img alt="food" src={el.image} style={{ width: "12pc" }}/>
        <CardBody>
          <CardTitle tag="h5" style={{color: "white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
            {el.title}
          </CardTitle>
            {el.summary}
          <Button href = {el.spoonacularSourceUrl}>
            View more details
          </Button>
        </CardBody>
      </Card>
      )}
    </> 
  );
}

export default Recipe
