let orders = JSON.parse(localStorage.getItem("orders")) || [];

let table = document.getElementById("orders");

orders.forEach((order) => {
  table.innerHTML += `
<tr>
<td>${order.name}</td>
<td>${order.phone}</td>
<td>${order.address}</td>
<td>${order.total}đ</td>
<td style="color:orange;font-weight:bold">${order.status}</td>
</tr>
`;
});
