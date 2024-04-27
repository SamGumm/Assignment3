/*
Author: Sam Gumm, Braeden Hegarty
ISU Netid : smgumm@iastate.edu
Date :  04/16
*/

//const { response } = require("express");
// document.addEventListener('DOMContentLoaded', function() {
//   fetchAllProducts();
// });

document.addEventListener('DOMContentLoaded', function() {
  // Create views and buttons
  function showView(viewId) {
    // Hide all views
    document.querySelectorAll('#views > div').forEach(view => {
      view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';
  }
  const views = ['get', 'post', 'delete', 'update'];
  const container = document.createElement('div');
  container.id = 'views';

  views.forEach(view => {
    const viewDiv = document.createElement('div');
    viewDiv.id = `view-${view}`;
    viewDiv.style.display = 'none';
    viewDiv.innerHTML = `<h2>${view.toUpperCase()} Products</h2>`;
    container.appendChild(viewDiv);
  });

  document.body.insertBefore(container, document.body.firstChild); // Insert views container at the top of the body

  const navigation = document.createElement('div');
  navigation.id = 'navigation';
  views.forEach(view => {
    const button = document.createElement('button');
    button.textContent = view.toUpperCase();
    button.onclick = () => showView(`view-${view}`);
    navigation.appendChild(button);
  });

  document.body.insertBefore(navigation, document.body.firstChild);

  // Show default view
  showView('view-get');
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
      img.src = product.image || 'default-image.jpg'; // Default image if none provided
      img.alt = 'Product Image';
      productDiv.appendChild(img);

      const details = document.createElement('div');
      details.className = 'product-details';
      const name = product.title || 'Unnamed Product'; 
      details.innerHTML = `<strong>${name}</strong><br>${product.description}<br>Price: $${product.price.toFixed(2)}`;
      productDiv.appendChild(details);

      container.appendChild(productDiv);
    });
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('product-list').textContent = 'Products not found.';
  }
}

