let cart = JSON.parse(localStorage.getItem("cart")) || [];
let customer = JSON.parse(localStorage.getItem("customer")) || {};

let total = 0;

cart.forEach((item) => {
  total += item.price * item.quantity;
});

document.getElementById("total").innerText =
  "Số tiền cần chuyển: " + total + "đ";

function finish() {
  alert("Đã ghi nhận thanh toán!");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let newOrder = {
    name: customer.name,
    phone: customer.phone,
    address: customer.address,
    products: cart,
    total: total,
    status: "Chờ xác nhận",
  };

  orders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  window.location.href = "pending.html";
}
