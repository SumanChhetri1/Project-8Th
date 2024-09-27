import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function ViewProduct()
{
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "View Product";

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    // Handle Feature Toggle
    const handleFeatureToggle = (id) => {
        axios.put(`/api/feature-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                // Reload products to reflect the updated feature status
                axios.get(`/api/view-product`).then(res => {
                    if (res.data.status === 200) {
                        setProduct(res.data.products);
                    }
                });
            } else {
                swal("Error", res.data.message, "error");
            }
        }).catch(error => {
            swal("Error", "Something went wrong", "error");
        });
    }

    var display_Productdata = "";
    if (loading) {
        return <h4>View Products Loading...</h4>
    } else {
        display_Productdata = viewProduct.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">
                            {item.qty === 0 ? 'View' : 'Edit'}
                        </Link>
                    </td>
                    <td>
                        <button onClick={() => handleFeatureToggle(item.id)} className="btn btn-success btn-sm">
                            {item.featured === 0 ? 'Feature' : 'Unfeature'}
                        </button>
                    </td>
                    <td>{item.qty === 0 ? 'Unavailable' : 'Available'}</td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product 
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Product Name</th>
                                    <th>Selling Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Featured</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
