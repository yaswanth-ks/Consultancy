import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import './Details.css';  // Ensure this CSS file contains your styles

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { id, company, img, info, price, title, inCart } = value.detailProduct;
          return (
            <main className="container py-5" aria-label="Product details page">
              {/* Title */}
              <section className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1 tabIndex="0">{title}</h1>
                </div>
              </section>

              {/* Product Info */}
              <section className="row d-flex align-items-start">
                {/* Product Image */}
                <div className="col-10 mx-auto col-md-5 my-3 product-image-container" role="img" aria-label={`${title} image`}>
                  <img src={img} className="img-fluid rounded shadow-sm" alt={`Image of ${title}`} />
                </div>

                {/* Product Text */}
                <article className="col-10 mx-auto col-md-7 my-3 product-info">
                  <h2 className="text-primary mb-3" tabIndex="0">Model: {title}</h2>
                  <h4 className="text-muted mb-2">
                    Made by: <span className="text-dark font-weight-bold">{company}</span>
                  </h4>
                  <h4 className="text-blue mb-4 display-6">
                    <strong>
                      Price: <span aria-label="price in dollars" role="text">${price.toFixed(2)}</span>
                    </strong>
                  </h4>

                  {/* Product Description */}
                  <section className="mb-4">
                    <p className="text-muted lead" tabIndex="0">
                      Experience the perfect blend of modern design and cutting-edge technology with this premium lighting fixture. Crafted meticulously for style and performance, it offers versatile lighting solutions — from ambient warmth to focused task lighting. Its sleek aluminum frame paired with frosted glass enhances any setting, while the energy-efficient LED guarantees low power consumption and long life.
                    </p>
                    <p className="text-muted" tabIndex="0">
                      Ideal for home, office, or commercial spaces, this fixture transforms your environment with subtle elegance and practical illumination.
                    </p>
                  </section>

                  {/* Product Specifications Table */}
                  <section>
                    <h3 className="mb-3">Product Specifications</h3>
                    <table className="product-specs table table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Height</th>
                          <td>18 inches</td>
                        </tr>
                        <tr>
                          <th scope="row">Width</th>
                          <td>12 inches</td>
                        </tr>
                        <tr>
                          <th scope="row">Material</th>
                          <td>Aluminum body with frosted glass</td>
                        </tr>
                        <tr>
                          <th scope="row">Light Type</th>
                          <td>Energy-efficient LED (3000K, Warm White)</td>
                        </tr>
                        <tr>
                          <th scope="row">Power Usage</th>
                          <td>15W – Energy Star Certified</td>
                        </tr>
                        <tr>
                          <th scope="row">Use Case</th>
                          <td>Suitable for indoor or covered outdoor areas</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  {/* Buttons */}
                  <section className="mt-4 d-flex gap-3" role="group" aria-label="Navigation and add to cart actions">
                    <Link to="/">
                      <ButtonContainer aria-label="Back to Products">Back to Products</ButtonContainer>
                    </Link>

                    <ButtonContainer
                      cart
                      disabled={inCart}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                      aria-disabled={inCart}
                      aria-label={inCart ? 'Already in cart' : 'Add to cart'}
                    >
                      {inCart ? 'In Cart' : 'Add to Cart'}
                    </ButtonContainer>
                  </section>
                </article>
              </section>
            </main>
          );
        }}
      </ProductConsumer>
    );
  }
}
