let cart = [];

async function generateSliderContent() {
  let currentSlide = 0;
let slideImg = document.getElementById('slideImg');
let playInterval;
showSlide(0);

document.getElementById('prevBtn').addEventListener('click', function() {
showSlide(--currentSlide);
});

document.getElementById('nextBtn').addEventListener('click', function() {
showSlide(++currentSlide);
});

async function showSlide(n) {
  const productData = await fetchData('https://fakestoreapi.com/products');
 
    if (n > productData.length -1) {
      currentSlide = 0;
    } else if (n < 0) {
      currentSlide = productData.length - 1;
    } else {
      currentSlide = n;
    }
  slideImg.setAttribute("src",productData[currentSlide].image);
  slideImg.setAttribute("alt",productData[currentSlide].category);
  }
}


// Function to fetch data from API
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


// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Function to add product to the cart
function addToCart(product) {
  cart.push(product);
  updateCartIcon();
}

// Function to update the cart icon with the number of items
function updateCartIcon() {
  const cartIcon = document.getElementById('cart-icon');

  if (cartIcon) {
    cartIcon.textContent = cart.length.toString();
     setCookie('cart', JSON.stringify(cart), 30); 
     console.log(getCookie('cart'));
  }
}



// Function to generate product card with add button
function generateProductCard(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  const imgElement = document.createElement('img');
  imgElement.src = product.image; 
  imgElement.alt = product.title; 

  const nameElement = document.createElement('p');
  nameElement.textContent = product.category;

  const priceElement = document.createElement('p');
  priceElement.innerHTML = `<strong>Price: ${product.price} $</strong>`; 

  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Cart';
  addButton.addEventListener('click', function() {
    addToCart(product);
  });
  const showDetailsButton = document.createElement('button');
  showDetailsButton.textContent = 'Show Details';
  showDetailsButton.addEventListener('click', function() {
    showProductDetails(product);
  });

  productElement.appendChild(imgElement);
  productElement.appendChild(nameElement);
  productElement.appendChild(priceElement);
  productElement.appendChild(addButton);
  productElement.appendChild(showDetailsButton);

  return productElement;
}

// Function to generate product information
async function generateProductInfo(category = 'all') {
  const productData = await fetchData('https://fakestoreapi.com/products');
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML =``;
  const filteredProducts = productData.filter(product => category === 'all' || product.category === category);
  if (filteredProducts && productsContainer) {
    filteredProducts.forEach(product => {
      const productCard = generateProductCard(product);
      productsContainer.appendChild(productCard);
    });
  } else {
    console.error('Product data or container not found.');
  }

}

// Function to show product details
function showProductDetails(product) {
  const productDetailsUrl = `../html/product-details.html?id=${product.id}`; 
  window.location.href = productDetailsUrl;
}

// Function to handle back to top button
function backToTop() {
  window.scrollTo(0, 0);
}

// Event listener for page load
window.onload = function() {
  generateSliderContent()
   generateProductInfo();

  // Retrieve cart from cookie on page load
  const cartCookie = getCookie('cart');
  if (!cartCookie) {
    setCookie('cart', JSON.stringify(cart), 30);
  } else {
    cart = JSON.parse(cartCookie);
  }
  updateCartIcon();
};

// Get the button element
var backToTopBtn = document.getElementById("back-to-top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
