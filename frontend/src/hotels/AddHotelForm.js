import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';

function AddHotelForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{
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
        name: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        phone: Yup.string(),
        email: Yup.string().email('Invalid email address'),
        website: Yup.string(),
        rating: Yup.number().min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5'),
        description: Yup.string()
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mb={2}>
            <Typography variant="subtitle1">Name:</Typography>
            <Field
              as={TextField}
              type="text"
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
              name="rating"
              variant="outlined"
              step="0.1"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Description:</Typography>
            <Field
              as={TextField}
              type="text"
              name="description"
              variant="outlined"
              multiline
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
          >
            Add Hotel
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddHotelForm;
