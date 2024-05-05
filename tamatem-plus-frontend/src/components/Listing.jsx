import React, { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../context/apis'
import { Container } from "react-bootstrap";
import products from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Listing() {

    const [productList, setProductList] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}products/list_products/`);
            setProductList(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);  // Handle errors appropriately
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Container>
            <div className='product-list-page'>
                <h1>Products Page</h1>
                <div className='product-list'>
                    {
                        productList?.map((product, i) => {
                            const link = `/details/${product?.id}`
                            return (
                                <Link to={link} key={i}>
                                    <div className="product-card" >
                                        <img src={product?.image} alt="" />
                                        <div className='product-card-body'>
                                            <div className='card-title'>{product?.title}</div>
                                            <div className='card-price'>${product?.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </Container>
    )
}
