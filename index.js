const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Endpoint 1: Calculate the total price of items in the cart
// cart-total?newItemPrice=1200&cartTotal=0
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});

// Endpoint 2 : Apply a discount based on membership status
// membership-discount?cartTotal=3600&isMember=true
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let discountPercentage = 10;
  let finalPrice;

  if (isMember === 'true') {
    let discountAmount = (cartTotal * discountPercentage) / 100;
    finalPrice = cartTotal - discountAmount;
  } else {
    finalPrice = cartTotal; // No discount
  }
  res.send(finalPrice.toString());
});

// Endpoint 3 : Calculate tax on the cart total
// calculate-tax?cartTotal=3600
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = 5;
  let finalPrice = (cartTotal * tax) / 100;

  res.send(finalPrice.toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method
// estimate-delivery?shippingMethod=express&distance=600
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send('Invalid shipping method');
  }

  res.send(deliveryDays.toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
// shipping-cost?weight=2&distance=600
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;

  res.send(result.toString());
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
// loyalty-points?purchaseAmount=3600
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyRate = 2;

  let result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
