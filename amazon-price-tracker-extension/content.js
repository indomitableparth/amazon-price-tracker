function getProductDetails() {
    const title = document.getElementById("productTitle")?.innerText?.trim();
    const priceText = document.querySelector(".a-price .a-offscreen")?.innerText?.replace(/[₹,]/g, "");
    const price = parseFloat(priceText);
    const imageUrl = document.getElementById("landingImage")?.src;
    const url = window.location.href;
  
    return { title, price, imageUrl, url };
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductData") {
      const details = getProductDetails();
      sendResponse(details);
    }
  });
  