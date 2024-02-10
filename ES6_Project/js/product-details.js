    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
  
      async function fetchData(url) {
          try {
              const response = await fetch(url);
              const data = await response.json();
              return data;
          } catch (error) {
              console.error('Error fetching data:', error);
              return null;
          }
  }
  
      async function displayProductDetails() {
        const productId = getUrlParameter('id');
        
          const product = await fetchData(`https://fakestoreapi.com/products/${productId}`);
        if (product) {
          const productDetailsContainer = document.getElementById('product-details');
          productDetailsContainer.innerHTML = `
          <div style="width:100%;">
              <div class="product-details">
               <h2>${product.category}</h2>
              <img src="${product.image}" id="productimg">
               <strong>Price: ${product.price} $</strong>
               <p>Description: ${product.description}</p>
          </div>
          </div>
          `;
        } else {
          console.error('Product not found.');
        }
      }
  
      window.onload = function() {
        displayProductDetails();
      };
    