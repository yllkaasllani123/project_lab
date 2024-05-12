import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';

function UpdateHotelForm({ onUpdate }) {
  return (
    <div className="update-hotel-form">
      <Formik
        initialValues={{
          hotelId: '',
          name: '',
          address: '',
          city: '',
          country: '',
          phone: '',
          email: '',
          website: '',
          rating: '',
          description: ''
        }}
        validationSchema={Yup.object({
          hotelId: Yup.string().required('Hotel ID is required'),
          name: Yup.string(),
          address: Yup.string(),
          city: Yup.string(),
          country: Yup.string(),
          phone: Yup.string(),
          email: Yup.string().email('Invalid email address'),
          website: Yup.string(),
          rating: Yup.number().min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5'),
          description: Yup.string()
        })}
        onSubmit={(values, { resetForm }) => {
          onUpdate(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Typography variant="subtitle1">Hotel ID:</Typography>
              <Field
                as={TextField}
                type="text"
                id="hotelId"
                name="hotelId"
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Name:</Typography>
              <Field
                as={TextField}
                type="text"
                id="name"
                name="name"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Address:</Typography>
              <Field
                as={TextField}
                type="text"
                id="address"
                name="address"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">City:</Typography>
              <Field
                as={TextField}
                type="text"
                id="city"
                name="city"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Country:</Typography>
              <Field
                as={TextField}
                type="text"
                id="country"
                name="country"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Phone:</Typography>
              <Field
                as={TextField}
                type="text"
                id="phone"
                name="phone"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Email:</Typography>
              <Field
                as={TextField}
                type="email"
                id="email"
                name="email"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Website:</Typography>
              <Field
                as={TextField}
                type="text"
                id="website"
                name="website"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Rating:</Typography>
              <Field
                as={TextField}
                type="number"
                id="rating"
                name="rating"
                variant="outlined"
                fullWidth
                step="0.1"
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">Description:</Typography>
              <Field
                as={TextField}
                type="text"
                id="description"
                name="description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Update Hotel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateHotelForm;
