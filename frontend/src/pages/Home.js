import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';


function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        //create function for async
        const fetchProducts = async () => {
            //fetch data
            const { data } = await axios.get('/api/products')
            //set empty array to products
            setProducts(data)
        }

        fetchProducts()
    }, [])
    //empty array is for dependencies that will change when fired

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
