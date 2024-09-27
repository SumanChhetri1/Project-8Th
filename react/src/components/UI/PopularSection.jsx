import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import swal from 'sweetalert';

const PopularSection = () => {
  const [loading, setLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch popular products from backend
  useEffect(() => {
    let isMounted = true;

    axios.get('/api/popular-products') // Modify this endpoint as per your backend route
      .then(res => {
        if (isMounted) {
          if (res.data.status === 200) {
            setPopularProducts(res.data.popular_products);
            setLoading(false);
          } else {
            swal('Error', res.data.message, 'error');
          }
        }
      })
      .catch(error => {
        swal('Error', 'Failed to fetch popular products', 'error');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle search functionality
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter and sort popular products based on search query
  const filteredProducts = popularProducts
    .filter(product => product.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Render loading state
  if (loading) {
    return <h4>Loading Popular Products...</h4>;
  }

  return (
    <section className="popular__section">
      <Container>
        <Row>
          <Col lg="12" className="text-center mt-5">
            <h2 className="section__title">Popular Rentals</h2>
          </Col>

          {/* Search Bar */}
          <Row className="mb-4 justify-content-end">
            <Col lg="4" md="6" sm="12">
              <input
                type="text"
                placeholder="Search popular products..."
                value={searchQuery}
                onChange={handleSearch}
                className="form-control"
              />
            </Col>
          </Row>

          {/* Popular Products */}
          <Col lg="12">
            <Row>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, idx) => (
                  <Col lg="4" md="6" sm="12" key={idx}>
                    <div className="popular__item card h-100">
                      <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                        <img
                          src={`http://localhost:8000/${item.image}`}
                          className="w-100 img_container"
                          alt={item.name}
                        />
                      </Link>
                      <div className="card-body">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <h4>No Popular Products Found</h4>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PopularSection;
