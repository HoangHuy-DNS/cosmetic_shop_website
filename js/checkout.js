function order() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (name === "" || phone === "" || address === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  let customer = {
    name: name,
    phone: phone,
    address: address,
  };

  localStorage.setItem("customer", JSON.stringify(customer));

  window.location.href = "payment.html";
}
