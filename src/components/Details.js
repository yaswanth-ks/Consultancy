import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import './Details.css';  // Ensure the path is correct based on your folder structure

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { id, company, img, info, price, title, inCart } = value.detailProduct;
          return (
            <div className="container py-5">
              {/* Title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>

              {/* Product Info */}
              <div className="row d-flex align-items-start">
                {/* Product Image */}
                <div className="col-10 mx-auto col-md-5 my-3 product-image-container">
                  <img src={img} className="img-fluid" alt="product" />
                </div>

                {/* Product Text */}
                <div className="col-10 mx-auto col-md-7 my-3 product-info">
                  <h2 className="text-primary mb-3">Model: {title}</h2>
                  <h4 className="text-muted mb-2">
                    Made by: <span className="text-dark">{company}</span>
                  </h4>
                  <h4 className="text-blue mb-3">
                    <strong>
                      Price: <span>$</span>
                      {price}
                    </strong>
                  </h4>

                  {/* Product Description */}
                  <p className="text-muted mb-3 product-description">
                    This premium lighting fixture combines modern style and advanced technology. Crafted for both functionality and elegance, it’s perfect for home or office spaces. With its sleek aluminum body and frosted glass, it offers both ambient and task lighting, providing a warm and inviting glow. The energy-efficient LED ensures low power consumption, while the elegant design elevates any environment.
                  </p>

                  {/* Product Specifications Table */}
                  <table className="product-specs">
                    <tbody>
                      <tr>
                        <td><strong>Height</strong></td>
                        <td className="spec-value">18 inches</td>
                      </tr>
                      <tr>
                        <td><strong>Width</strong></td>
                        <td className="spec-value">12 inches</td>
                      </tr>
                      <tr>
                        <td><strong>Material</strong></td>
                        <td className="spec-value">Aluminum body with frosted glass</td>
                      </tr>
                      <tr>
                        <td><strong>Light Type</strong></td>
                        <td className="spec-value">Energy-efficient LED (3000K, Warm White)</td>
                      </tr>
                      <tr>
                        <td><strong>Power Usage</strong></td>
                        <td className="spec-value">15W – Energy Star Certified</td>
                      </tr>
                      <tr>
                        <td><strong>Use Case</strong></td>
                        <td className="spec-value">Suitable for indoor or covered outdoor areas</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? 'inCart' : 'add to cart'}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
