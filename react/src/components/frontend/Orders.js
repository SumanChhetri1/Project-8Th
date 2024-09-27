import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Helmet from '../../components/Helmet/Helmet';

function Orders(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ratings, setRatings] = useState({});
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/myorders`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);
                } else if (res.data.status === 401) {
                    history.push('/');
                    swal('Warning', res.data.message, 'error');
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [history]);

    const handleRatingChange = (orderId, rating) => {
        setRatings({ ...ratings, [orderId]: rating });
    };

    const handleReviewChange = (orderId, review) => {
        setReviews({ ...reviews, [orderId]: review });
    };

    const submitReviewAndReturn = (order) => {
        const data = {
            user_id: order.user_id,          // Include user_id
            user_name: order.user_name,      // Include user_name
            product_id: order.product_id,    // Include product_id
            product_name: order.product_name,// Include product_name
            order_id: order.id,              // Include order_id
            return_qty: 1,                   // Assume return_qty as 1 (adjust as needed)
            rating: ratings[order.id],       // Include rating
            review: reviews[order.id],       // Include review
        };

        axios.post(`/api/submit-review-and-return`, data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
                // Optionally refresh orders or navigate
            } else {
                swal("Error", res.data.message, "error");
            }
        }).catch(error => {
            swal("Error", "An error occurred while processing your request", "error");
        });
    };

    if (loading) {
        return <h4>Loading Orders...</h4>;
    }

    return (
        <div>
            <Helmet title="Orders" />
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Orders</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {orders.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product</th>
                                                <th>Rating</th>
                                                <th>Review</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, idx) => (
                                                <tr key={idx}>
                                                    <td width="20%">
                                                        <img
                                                            src={`http://localhost:8000/${order.product_image}`}
                                                            alt={order.product_name}
                                                            width="100px"
                                                            height="100px"
                                                        />
                                                    </td>
                                                    <td>{order.product_name}</td>
                                                    <td width="20%">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <span 
                                                                key={star} 
                                                                onClick={() => handleRatingChange(order.id, star)} 
                                                                style={{ 
                                                                    cursor: 'pointer', 
                                                                    color: star <= (ratings[order.id] || 0) ? 'gold' : 'gray', 
                                                                    fontSize: '2rem', 
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td width="20%">
                                                        <input
                                                            type="text"
                                                            placeholder="Write a review..."
                                                            value={reviews[order.id] || ''}
                                                            onChange={(e) => handleReviewChange(order.id, e.target.value)}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td width="20%">
                                                        <button
                                                            type="button"
                                                            onClick={() => submitReviewAndReturn(order)}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            Submit & Return
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="card card-body py-5 text-center shadow-sm">
                                    <h4>Your Order List is Empty</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
