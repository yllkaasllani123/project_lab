import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Tabs, Tab } from '@mui/material';
import AddHotelForm from '../hotels/AddHotelForm';
import DeleteHotelForm from '../hotels/DelteHotelForm';
import UpdateHotelForm from '../hotels/UpdateHotelForm';
import AllHotels from '../hotels/AllHotels';

function HotelManagement() {
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 'hotels') {
      fetchAllHotels();
    }
  };
  
  const handleSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:3001/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add hotel');
      }
      setSubmitting(false);
      setActiveTab('hotels'); // Switch to the 'hotels' tab after successful addition
      return response.json();
    })
    .catch(error => {
      console.error('Error adding hotel:', error);
      alert('Failed to add hotel');
      setSubmitting(false);
    });
  };

  const onDelete = (hotelId) => {
    fetch(`http://localhost:3001/hotels/${hotelId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete hotel');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the response data from the server
      alert('Hotel deleted successfully');
      setActiveTab('hotels'); // Switch to the 'hotels' tab after successful deletion
      fetchAllHotels(); // Fetch updated list of hotels after deletion
    })
    .catch(error => {
      console.error('Error deleting hotel:', error);
      alert('Failed to delete hotel');
    });
  };

  const onUpdate = (values) => {
    const { hotelId, name, address, city, country, phone, email, website, rating, description } = values;
  
    fetch(`http://localhost:3001/hotels/${hotelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        address,
        city,
        country,
        phone,
        email,
        website,
        rating,
        description
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update hotel');
      }
      setActiveTab('hotels'); // Switch to the 'hotels' tab after successful update
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert('Hotel updated successfully');
    })
    .catch(error => {
      console.error('Error updating hotel:', error);
      alert('Failed to update hotel');
    });
  };

  const fetchAllHotels = () => {
    fetch('http://localhost:3001/hotels')
      .then(response => response.json())
      .then(data => setHotels(data))
      .catch(error => console.error('Error fetching hotels:', error));
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4">Hotel Management</Typography>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Hotels" value="hotels" />
          <Tab label="Add Hotel" value="add" />
          <Tab label="Delete Hotel" value="delete" />
          <Tab label="Update Hotel" value="update" />
        </Tabs>
        <div>
          {activeTab === 'add' && (
            <AddHotelForm onSubmit={handleSubmit} />
          )}
          {activeTab === 'delete' && (
            <DeleteHotelForm onDelete={onDelete} />
          )}
          {activeTab === 'update' && (
            <UpdateHotelForm onUpdate={onUpdate} />
          )}
          {activeTab === 'hotels' && (
            <AllHotels hotels={hotels} />
          )}
        </div>
      </Box>
    </Container>
  );
}

export default HotelManagement;
