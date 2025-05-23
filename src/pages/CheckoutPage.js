import React, { useState } from 'react';
import '../styles/CheckoutPage.css'; 
import { ProductConsumer } from '../context';

export default function CheckoutPage() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // States and districts dropdown options
  const districtsByState = {
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
    "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
    "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
    "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
    "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
    "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ],
  "Karnataka": [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri",
    "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur",
    "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada",
    "Vijayapura", "Yadgir"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
    "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
    "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Andhra Pradesh": [
    "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor",
    "East Godavari", "Eluru", "Guntur", "Kakinada", "Konaseema",
    "Krishna", "Kurnool", "Nandyal", "Nellore", "NTR", "Palnadu",
    "Parvathipuram Manyam", "Prakasam", "Srikakulam", "Tirupati",
    "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ]
};
  const statesList = Object.keys(districtsByState);

  const districts = districtsByState[state] || [];

  const handleConfirmOrder = () => {
    if (!state || !district || !street || !pincode) {
      alert('Please fill all address fields');
      return;
    }
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <ProductConsumer>
      {value => {
        const { user } = value; // get real user from context

        return (
          <div className="container my-5">
            <h2 className="mb-4">Checkout</h2>

            {/* 1. Login */}
            <div className="card mb-3">
              <div className="card-header">
                <span>1. Login</span>
              </div>
              <div className="card-body">
                <p>You're logged in as <strong>{user?.name || ''}</strong>.</p>
                <p>{user?.email ? user.email : 'yaswanth@gmail.com'}</p>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="card mb-3">
              <div className="card-header">
                <span>2. Delivery Address</span>
              </div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <label>State</label>
                  <select
                    className="form-control"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setDistrict('');
                    }}
                  >
                    <option value="">-- Select State --</option>
                    {statesList.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>District</label>
                  <select
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!state}
                  >
                    <option value="">-- Select District --</option>
                    {districts.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Street Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter street name"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Apartment / House No.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter apartment or house no."
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter pincode"
                    maxLength="6"
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setPincode(val);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Confirmation & Contact */}
            <div className="card mb-3">
              <div className="card-header">
                <span>3. Confirmation & Contact</span>
              </div>
              <div className="card-body d-flex align-items-center gap-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phone}
                  style={{ maxWidth: '250px' }}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmOrder}
                >
                  Done
                </button>
              </div>

              <p className="mt-3"><strong>Contact us directly:</strong></p>
              <ul>
                <li>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></li>
                <li>📧 Email: <a href="mailto:yaswanth@gmail.com">yaswanth@gmail.com</a></li>
                <li>💬 WhatsApp: <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">Chat with us</a></li>
              </ul>
            </div>

            {orderPlaced && (
              <div className="overlay">
                <div className="success-card">
                  <div className="tick-animation">✔️</div>
                  <h2>Congratulations!</h2>
                  <p>Your order has been placed successfully. Our team will contact you shortly.</p>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ProductConsumer>
  );
}
