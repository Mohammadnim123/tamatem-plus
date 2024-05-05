import { useEffect, useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiContext } from '../context/apis'


export default function Details() {
    const navigate = useNavigate();
    const api = useContext(ApiContext)

    const [product, setProduct] = useState([]);
    let { productId } = useParams();

    const getProduct = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}/get_product/`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.response && error.response.status === 404) {
                navigate('/404');
            }
        }
    }

    useEffect(() => {
        getProduct(productId)
    }, [])

    return (
        <Container>
            <div className='product-details-page'>
                <h1>Products Details</h1>
                <div className='product-details'>
                    <img src={product.image} alt="" />
                    <div className="product-details-body">
                        {api.isLoggedIn && <div className="edit-btn" onClick={() => { navigate('/edit/' + product.id) }}>
                            <i class="fa-regular fa-pen-to-square"></i>  Edit
                        </div>}
                        <h2>{product.title}</h2>
                        <div className="description">{product.description}</div>
                        <h4 className="price">Price ${product.price}</h4>
                        <div className='cta'>CTA</div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
