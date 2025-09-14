let allProducts = [];

async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  allProducts = await res.json();
  displayProducts(allProducts);
}

function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML =
      "<p style='grid-column: span 4; text-align:center;'>No products found.</p>";
    return;
  }
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <h4>${p.title}</h4>
          <p class="price">$${p.price}</p>
          <p class="category">${p.category}</p>
        `;
    container.appendChild(card);
  });
}

function applyFilter() {
  const category = document.getElementById("category").value.toLowerCase();
  const search = document.getElementById("search").value.toLowerCase();
  const sort = document.getElementById("sort").value;

  let filtered = [...allProducts];

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category);
  }

  if (search) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(search));
  }

  if (sort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

loadProducts();
