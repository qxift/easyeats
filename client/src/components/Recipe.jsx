import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';


function Recipe({recipes}) {
  

  return (
    <>
    <br></br>
    <br></br>
      {recipes && recipes.map(el => 
      <Card>
          <CardTitle tag="h5" style={{color: "white", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
            {el.title}
          </CardTitle>
          <CardBody>
          <img alt="food" src={el.image} style={{ width: "12pc" }}/>
          <br></br>
          </CardBody>
          <CardSubtitle>
          <br></br>
          <div className="content" dangerouslySetInnerHTML={{__html: el.summary}}></div>
          <br></br>
          </CardSubtitle>
          <Button href = {el.spoonacularSourceUrl}>
            View more details
          </Button>
          <br></br>
          <br></br>
          <br></br>
      </Card>
      )}
    </> 
  );
}

export default Recipe
