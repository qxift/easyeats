import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';


function Recipe({recipes}) {
  
  useEffect(() => {
    
  }, [])

  return (
    <>
      {recipes && recipes.map(el => 
      <Card>
        <img alt="food" src={el.image} style={{ width: "20pc" }}/>
        <CardBody>
          <CardTitle tag="h5">
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
