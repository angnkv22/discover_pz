import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DailyPlanner = ({ dailyPlans }) => {

  return (
    <Grid container spacing={1}>
      {dailyPlans && dailyPlans.map((day, index) => (
        <Grid item key={index} xs={12}>
          <Droppable droppableId={`day-${day.id}`} type="PLACE">
            {(provided) => (
              <Paper ref={provided.innerRef} {...provided.droppableProps} elevation={4} style={{ padding: '20px', height: '100%', width: "100%", background: "#c7dbe2" }}>
                <Typography variant="h6" gutterBottom style={{ maxWidth: "100%" }}>
                  Day {index + 1}: {day.date}
                </Typography>
                {day.places && day.places.map((place, placeIndex) => (
                  <Draggable key={place.id} draggableId={place.id} index={placeIndex}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {place.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        </Grid>
      ))}
    </Grid>
  );
};

export default DailyPlanner;