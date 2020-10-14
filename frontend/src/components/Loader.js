import React from 'react';
import { Spinner } from 'react-bootstrap';
 
function Loader() {
    return (
        <Spinner className="loader" animation="grow" variant="info" role='status'>
            <span className='sr-only'>Loading Up...</span>
        </Spinner>
    )
}

export default Loader;