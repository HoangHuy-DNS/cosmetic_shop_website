function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = cart.find((item) => item.name === name);

  if (product) {
    product.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Đã thêm vào giỏ hàng");
}
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let table = document.getElementById("cart-items");

  let total = 0;

  table.innerHTML = "";

  cart.forEach((item, index) => {
    let subtotal = item.price * item.quantity;

    total += subtotal;

    table.innerHTML += `
<tr>

<td><img src="${item.image}" width="60"></td>

<td>${item.name}</td>

<td>${item.price}đ</td>

<td>${item.quantity}</td>

<td>${subtotal}đ</td>

<td>
<button onclick="removeItem(${index})">❌</button>
</td>

</tr>
`;
  });

  document.getElementById("total").innerText = "Tổng tiền: " + total + "đ";
}
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}
function searchProduct() {
  let keyword = document.getElementById("searchInput").value.toLowerCase();

  let products = document.querySelectorAll(".product");

  products.forEach(function (product) {
    let name = product.querySelector(".product-name").innerText.toLowerCase();

    if (name.includes(keyword)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
function toggleWarranty(){
let box = document.getElementById("warranty-box");

if(box.style.display === "block"){
box.style.display = "none";
}else{
box.style.display = "block";
}
}

