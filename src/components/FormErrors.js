import React from 'react';
import Alert from 'react-bootstrap/Button'

export const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                   
                      <Alert key={i} variant='danger'>
                        {fieldName} {formErrors[fieldName]}
                        </Alert>

                )
            } else {
                return '';
            }
        })}
    </div>