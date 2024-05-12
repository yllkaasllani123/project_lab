import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function AllHotels({ hotels }) {
  return (
    <Box mt={3}>
      <Paper elevation={3}>
        <List>
          {hotels.map(hotel => (
            <React.Fragment key={hotel.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography variant="h6">{hotel.name}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography variant="subtitle1" gutterBottom>{`${hotel.city}, ${hotel.country}`}</Typography>
                      <Typography variant="body1" gutterBottom>{hotel.address}</Typography>
                      <Typography variant="body2" gutterBottom>Rating: {hotel.rating}</Typography>
                      <Typography variant="body2" gutterBottom>Phone: {hotel.phone}</Typography>
                      <Typography variant="body2" gutterBottom>Email: {hotel.email}</Typography>
                      <Typography variant="body2" gutterBottom>Website: {hotel.website}</Typography>
                      <Typography variant="body2">Description: {hotel.description}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default AllHotels;
