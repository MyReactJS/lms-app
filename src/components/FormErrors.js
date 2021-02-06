import React from 'react';
import Alert from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Button';
/*
 * 
 *  <Alert key={i} variant='danger'>
                        {fieldName} {formErrors[fieldName]}
                        </Alert>
                        */
export const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                   <React.Fragment>
                     <br/>
                        <h4 key={i}>
                            {fieldName} {formErrors[fieldName]}  </h4>
                    </React.Fragment>

                )
            } else {
                return '';
            }
        })}

    </div>