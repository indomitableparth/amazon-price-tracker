// document.addEventListener("DOMContentLoaded", () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//       chrome.tabs.sendMessage(tab.id, { action: "getProductData" }, (response) => {
//         document.getElementById("trackForm").addEventListener("submit", async (e) => {
//           e.preventDefault();
//           const email = document.getElementById("email").value;
//           const desiredPrice = document.getElementById("price").value;
  
//           const productData = {
//             name: response.title,
//             url: response.url,
//             imageUrl: response.imageUrl,
//             desiredPrice,
//             email,
//           };
  
//           try {
//             const res = await fetch("http://localhost:5000/api/products", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(productData),
//             });
  
//             const data = await res.json();
//             document.getElementById("status").innerText = res.ok
//               ? "✅ Product is being tracked!"
//               : `❌ ${data.error || "Error tracking product"}`;
//           } catch (err) {
//             document.getElementById("status").innerText = "❌ Failed to track.";
//           }
//         });
//       });
//     });
//   });
  //new one
// document.addEventListener("DOMContentLoaded", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//     chrome.tabs.sendMessage(tab.id, { action: "getProductData" }, async (response) => {
//       if (!response || !response.title || !response.price) {
//         document.getElementById("status").innerText = "❌ Failed to fetch product details.";
//         return;
//       }

//       const { title, price, url, imageUrl } = response;

//       // === PREDICT DROP API CALL ===
//       try {
//         const predictionRes = await fetch("http://localhost:5000/api/predict-drop", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             title,
//             price,
//             url,
//             // add more fields if your model uses them
//           }),
//         });

//         const prediction = await predictionRes.json();

//         // === SHOW PREDICTION STATUS BOX ===
//         const predictionBox = document.createElement("div");
//         predictionBox.id = "predictionBox";
//         predictionBox.style.marginTop = "10px";
//         predictionBox.style.padding = "8px";
//         predictionBox.style.textAlign = "center";
//         predictionBox.style.fontWeight = "bold";
//         predictionBox.style.borderRadius = "6px";
//         predictionBox.style.color = prediction.willDropSoon ? "#166534" : "#991b1b";
//         predictionBox.style.backgroundColor = prediction.willDropSoon ? "#dcfce7" : "#fee2e2";
//         predictionBox.innerText = prediction.willDropSoon
//           ? "📉 Likely to drop soon!"
//           : "🔒 Price stable for now.";

//         document.body.appendChild(predictionBox);
//       } catch (err) {
//         console.warn("Prediction API error:", err);
//         const fallback = document.createElement("div");
//         fallback.style.color = "#f59e0b";
//         fallback.style.marginTop = "10px";
//         fallback.style.textAlign = "center";
//         fallback.innerText = "⚠️ Prediction unavailable";
//         document.body.appendChild(fallback);
//       }

//       // === TRACK FORM SUBMISSION ===
//       document.getElementById("trackForm").addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const email = document.getElementById("email").value;
//         const desiredPrice = document.getElementById("price").value;

//         const productData = {
//           name: title,
//           url,
//           imageUrl,
//           desiredPrice,
//           email,
//         };

//         try {
//           const res = await fetch("http://localhost:5000/api/products", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(productData),
//           });

//           const data = await res.json();

//           document.getElementById("status").innerText = res.ok
//             ? "✅ Product is being tracked!"
//             : `❌ ${data.error || "Error tracking product"}`;
//         } catch (err) {
//           document.getElementById("status").innerText = "❌ Failed to track.";
//         }
//       });
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: "getProductData" }, async (response) => {
      const statusDiv = document.getElementById("status");

      if (!response || !response.title || !response.price) {
        statusDiv.innerText = "❌ Failed to fetch product details.";
        return;
      }

      const { title, price, url, imageUrl } = response;

      // === Predict Price Drop ===
      try {
        const predictionRes = await fetch("http://localhost:5000/api/predict-drop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, price, url }),
        });

        const prediction = await predictionRes.json();

        const predictionBox = document.createElement("div");
        predictionBox.id = "predictionBox";
        predictionBox.style.marginTop = "10px";
        predictionBox.style.padding = "8px";
        predictionBox.style.textAlign = "center";
        predictionBox.style.fontWeight = "bold";
        predictionBox.style.borderRadius = "6px";
        predictionBox.style.color = prediction.willDropSoon ? "#166534" : "#991b1b";
        predictionBox.style.backgroundColor = prediction.willDropSoon ? "#dcfce7" : "#fee2e2";
        predictionBox.innerText = prediction.willDropSoon
          ? "📉 Likely to drop soon! Just Track and wait"
          : "🔒 Price stable for now you can buy now or you can Track this product with your target price";

        document.body.appendChild(predictionBox);
      } catch (err) {
        console.warn("Prediction API error:", err);
        const fallback = document.createElement("div");
        fallback.style.color = "#f59e0b";
        fallback.style.marginTop = "10px";
        fallback.style.textAlign = "center";
        fallback.innerText = "⚠️ Prediction unavailable";
        document.body.appendChild(fallback);
      }

      // === Submit Tracking ===
      document.getElementById("trackForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const desiredPrice = document.getElementById("price").value;

        const productData = {
          name: title,
          url,
          imageUrl,
          desiredPrice,
          email,
        };

        try {
          const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          });

          const data = await res.json();
          statusDiv.innerText = res.ok
            ? "✅ Product is being tracked!"
            : `❌ ${data.error || "Error tracking product"}`;
        } catch (err) {
          statusDiv.innerText = "❌ Failed to track.";
        }
      });
    });
  });
});

