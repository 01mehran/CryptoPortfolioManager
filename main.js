document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=";

  document.getElementById("add-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const crypto = document.getElementById("crypto-select").value;
    const amount = document.getElementById("token-amount").value;

    if (crypto && amount) {
      fetch(`${apiURL}${crypto}&vs_currencies=usd`)
        .then((res) => res.json())
        .then((data) => {
          const price = data[crypto].usd;
          const totalValue = price * amount;
          const list = document.getElementById("list");
          const li = document.createElement("li");
          li.innerHTML = `
            <div>
              crypto name : <span class="crypto-name">${
                crypto.charAt(0).toUpperCase() + crypto.slice(1)
              }</span><br>
              total Tokens : <span class="token-amount">${amount}</span><br>
              current price : <span class="total-price">$${totalValue.toFixed(
                2
              )}</span><br>
              each token price: <span class="token-price">${price}</span> 
            </div>
            <div class="btnCo">
              <button class="delete-btn">Delete</button>
              <button class="edit-btn">Edit</button>
            </div>
          `;

          list.appendChild(li);
          document.getElementById("token-amount").value = "";

          // Delete button
          li.querySelector(".delete-btn").addEventListener("click", () => {
            list.removeChild(li);
          });

          // Edit button
          let isEditing = false;
          li.querySelector(".edit-btn").addEventListener("click", () => {
            if (!isEditing) {
              // Start editing
              isEditing = true;

              // Get the current values
              const currentCrypto =
                li.querySelector(".crypto-name").textContent;
              const currentAmount =
                li.querySelector(".token-amount").textContent;

              // Replace the content with input fields
              li.querySelector(".crypto-name").innerHTML = `
                <span>${currentCrypto}</span>
              `;
              li.querySelector(".token-amount").innerHTML = `
                <input type="number" class="edit-amount" value="${currentAmount}">
              `;

              // Change edit button text to "Save"
              li.querySelector(".edit-btn").textContent = "Save";
            } else {
              // Save changes
              isEditing = false;

              // Get the new amount
              const newAmount = li.querySelector(".edit-amount").value;

              // Update the list item with new values
              li.querySelector(".token-amount").textContent = newAmount;

              // Recalculate and update the total price
              const price = parseFloat(
                li.querySelector(".token-price").textContent
              );
              const totalValue = price * newAmount;
              li.querySelector(
                ".total-price"
              ).textContent = `$${totalValue.toFixed(2)}`;

              // Change edit button text back to "Edit"
              li.querySelector(".edit-btn").textContent = "Edit";
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter a currency or crypto");
    }
  });
});
