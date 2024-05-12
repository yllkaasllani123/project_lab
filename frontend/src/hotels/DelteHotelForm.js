import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';

function DeleteHotelForm({ onDelete }) {
  return (
    <div className="delete-hotel-form">
      <Formik
        initialValues={{
          hotelId: ''
        }}
        validationSchema={Yup.object({
          hotelId: Yup.string().required('Hotel ID is required')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onDelete(values.hotelId);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Enter Hotel ID:
              </Typography>
              <Field
                as={TextField}
                type="text"
                id="hotelId"
                name="hotelId"
                label="Hotel ID"
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Delete Hotel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DeleteHotelForm;
