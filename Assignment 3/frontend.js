/*
Author: Sam Gumm, Braeden Hegarty
ISU Netid : smgumm@iastate.edu
Date :  04/16
*/

const { response } = require("express");
document.addEventListener('DOMContentLoaded', function() {
  fetchAllProducts();
});


async function fetchAllProducts() {
  const url = 'http://localhost:8081/listAllProducts';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching products');

    const products = await response.json();
    
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Clear previous results

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      const img = document.createElement('img');
      img.src = product.imageUrl || 'path/to/default-image.jpg'; // Default image if none provided
      img.alt = 'Product Image';
      productDiv.appendChild(img);

      const details = document.createElement('div');
      details.className = 'product-details';
      details.innerHTML = `<strong>${product.name}</strong><br>${product.description}<br>Price: $${product.price.toFixed(2)}`;
      productDiv.appendChild(details);

      container.appendChild(productDiv);
    });
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('product-list').textContent = 'Products not found.';
  }
}

