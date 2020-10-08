import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';


function Home() {
    return (
        <div>
            <h2>Latest Work</h2>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} className='product-container'>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home
