import React from 'react';
import { Paper, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Restaurant, CameraAlt } from '@material-ui/icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const BucketList = ({ bucketList, onDropFromBucketList }) => {

  return (
    <Droppable droppableId="bucket-list" type="PLACE">
      {(provided) => (
        <Paper ref={provided.innerRef} {...provided.droppableProps} style={{ padding: '10px', height: "280px", maxHeight: '400px', overflowY: 'auto', background: "#c7dbe2" }}>
          <Typography variant="h6" gutterBottom>
            Bucket List
          </Typography>
          <List>
            {bucketList.map((place, index) => (
              <Draggable key={place.id} draggableId={`place-${index}`} index={index}>
                {(provided) => (
                  <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <ListItemAvatar>
                      {place.type === "restaurants" ? <Restaurant /> : place.type === "attractions" ? <CameraAlt /> : null}
                    </ListItemAvatar>
                    <ListItemText
                      primary={place.name}
                      secondary={`Address: ${place.address}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => onDropFromBucketList(place)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
          </List>
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default BucketList;
