let renderingData = [];
let section = "Men";

const onSection = (sec) => {
  section = sec;
  processData(renderingData);
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  const activeButton = document.getElementById(
    `${section.toLowerCase()}section`
  );
  activeButton.classList.add("active");
};

const apiDataFetching = async () => {
  try {
    const url =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    renderingData.push(data);
    processData(renderingData);
  } catch (err) {
    console.log("error: " + err.message);
  }
};

apiDataFetching();
const calculateOffer = (currentPrice, comparePrice) => {
  const discount = ((comparePrice - currentPrice) / comparePrice) * 100;
  return Math.round(discount);
};
const processData = (data) => {
  const contentContainer = document.getElementById("content-container");
  const iteratingData = data[0].categories;

  contentContainer.innerHTML = `
    <div id="content-container">
        <h1 class="head">SELECT  YOUR  CHOICE</h1>
        <div class="buttonsDisplay">
        <button class="btn active" id="mensection" type="button" onclick="onSection('Men')">Men</button>
        <button class="btn" id="womensection" type="button" onclick="onSection('Women')">Women</button>
        <button class="btn"  id="kidssection" type="button" onclick="onSection('Kids')">Kids</button></div>
    </div>
  `;

  let cardsDivision = document.createElement("div");
  let cardscontent = document.createElement("ul");
  cardscontent.classList.add("list-container");
  cardsDivision.appendChild(cardscontent);

  iteratingData.forEach((item) => {
    if (item.category_name === section) {
      item.category_products.forEach((product) => {
        let listItems = document.createElement("li");
        listItems.classList.add("list-item");
        cardscontent.appendChild(listItems);

        let listDiv = document.createElement("div");
        listDiv.classList.add("listDiv");
        listItems.appendChild(listDiv);

        listDiv.innerHTML = `
    ${
      product.badge_text !== null
        ? `<p class="badge">${product.badge_text}</p>`
        : ""
    }
    <img src=${product.image} alt="productImage" class="productImage" />
    <div class="firstRow">
        <p class="name">${
          product.title.length > 15
            ? `${product.title.slice(0, 10)}...`
            : product.title
        }</p>

        <div class="companyDiv">
            <p class="dot"></p>
            <p class="company">${product.vendor}</p>
        </div>
    </div>
    <div class="secondRow">
        <p class="price">RS  ${product.price}.00</p>
        <p class="compare">${product.compare_at_price}.00</p>
        <p class="offer">${calculateOffer(
          product.price,
          product.compare_at_price
        )}% Off</p>
        
    </div>
    <button type="button" class="button">Add to cart</button>
`;
      });

      contentContainer.appendChild(cardsDivision);
    }
  });
};
