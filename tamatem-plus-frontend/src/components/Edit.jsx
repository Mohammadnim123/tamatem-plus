import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { ApiContext } from '../context/apis'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';




export default function Edit() {
    const api = useContext(ApiContext)
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    let { productId } = useParams();

    const edit = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}products/${productId}/update_product/`;
        const data = {
            title: e.currentTarget[0].value,
            description: e.currentTarget[1].value,
            price: e.currentTarget[2].value,
            image: image,
        };
        const headers = {
            "Authorization" : `Bearer ${api.getToken()}`,
            "Content-Type": "application/json"
        };
        axios.post(url, data, {headers: headers})
        .then(response => {
            navigate(`/details/${productId}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const goTo = (url) => {
        navigate(url)
    }


    const getDetails = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}/get_product/`);
            setName(response.data.title);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setImage(response.data.image);
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.response && error.response.status === 404) {
                navigate('/404');
            }
        }
    }

    useEffect(() => {
        if (!api.isLoading){
            if (api.isLoggedIn) {
                getDetails(productId);
            } else {
                navigate('/');
            }
        }
    }, [api.isLoggedIn, api.isLoading]);

    return (
        <Container>
            <div className='edit-page'>
                <h1>Edit</h1>
                <Form className='edit-form' onSubmit={edit}>
                    <div className="file"></div>
                    <Form.Group className="mb-3 form-group" controlId="formGroupEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control value={name} type="text" placeholder="Enter Product Name" name='product_name' onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group" controlId="formGroupPassword">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control value={description} type="text" placeholder="Product Description" name='product_description' onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group" controlId="formGroupPassword">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control value={price} type="text" placeholder="Product Price" name='product_price' onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <div className='edit-actions'>
                        <Button className='cancel' onClick={() => {goTo('/details/'+ productId)}}>
                            Cancel
                        </Button>
                        <Button className='save' type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>

        </Container>
    )
}
