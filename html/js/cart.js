// Lấy giỏ hàng
function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Hàm thêm vào giỏ (Dùng chung cho cả Home và Bán chạy)
function addToCart(name, price, img) {
    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.name === name);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            img: img, // Lưu đường dẫn ảnh
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Đã thêm " + name + " vào giỏ hàng!");
}

// Hàm hiển thị tại trang cart.html
function displayCart() {
    const cart = getCart();
    const cartTable = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    if (!cartTable) return; // Nếu không phải trang giỏ hàng thì thoát

    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartTable.innerHTML += `
            <tr>
                <td><img src="${item.img}" width="80" style="border-radius:5px;"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}₫</td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>${subtotal.toLocaleString()}₫</td>
                <td><button onclick="removeItem(${index})" style="color:red">Xóa</button></td>
            </tr>
        `;
    });

    totalElement.textContent = `Tổng cộng: ${total.toLocaleString()}₫`;
}

// Thay đổi số lượng
window.changeQty = function(index, delta) {
    let cart = getCart();
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    saveCart(cart);
    displayCart();
};

// Xóa sản phẩm
window.removeItem = function(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
};

// Cập nhật số lượng trên icon giỏ hàng (nếu có)
function updateCartBadge() {
    const cart = getCart();
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalQty;
    }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);