// const convertButton = document.getElementById('convert');
// const amountInput = document.getElementById('amount');
// const fromCurrencySelect = document.getElementById('fromCurrency');
// const toCurrencySelect = document.getElementById('toCurrency');
// const resultDisplay = document.getElementById('result');

// // Replace with actual exchange rate API endpoint
// const exchangeRateAPI = 'b2111e5fe471db31f00a4534d2e64ebd';

// convertButton.addEventListener('click', () => {
//     const amount = amountInput.value;
//     const fromCurrency = fromCurrencySelect.value;
//     const toCurrency = toCurrencySelect.value;

//     // replace with actual exchange rate API request
//     const axios = require('axios');

// const API_ENDPOINT = 'https://api.apilayer.com/exchangerates_data/latest?base=USD';

// axios.get(API_ENDPOINT)
//   .then((response) => {
//     const data = response.data; // Exchange rate data
//     // Use the data for your application
//   })
//   .catch((error) => {
//     console.error('Error fetching exchange rates:', error);
//   });

//     fetch(exchangeRateAPI)
//         .then(response => response.json())
//         .then(data => {
//             const exchangeRates = data.rates;
//             const exchangeRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
//             const convertedAmount = (amount * exchangeRate).toFixed(2);
//             resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
//         })
//         .catch(error => {
//             console.error('Error fetching exchange rates: ' + error);
//         });
// });
//currency one,currency two,amount one ,amount two,swap,rate
// const currencyOne=document.getElementById('currency-one');
// const currencyTwo=document.getElementById('currency-two');
// const amountOne=document.getElementById('Amount-One');
// const amountTwo=document.getElementById('Amount-Two');
// const rate=document.getElementById('rate');
// const swap=document.getElementById('swap');
// //calculate
// function calculate(){
//     const currone=currencyOne.value;
//     const currtwo=currencyTwo.value;
//     fetch(`https://v6.exchangerate-api.com/v6/0d2873bb8ab36307de003f42/latest/${currencyOne.value}`)
//     .then(res=>res.json())
//     .then(data=>{
//         const rateE=data.rates[currtwo];
//         rate.innerText= `1 ${currone}=${rateE} ${currtwo}`;
//         amountTwo.value=(amountOne.value*rateE).toFixed(2);
//     })

// }
// currencyOne.addEventListener('change',calculate);
// currencyTwo.addEventListener('change',calculate);
// amountOne.addEventListener('input',calculate);
// amountTwo.addEventListener('input',calculate);
// swap.addEventListener('click',()=>{
//     const temp=currencyOne.value;
//     currencyOne.value=currencyTwo.value;
//     currencyTwo.value=temp;
//     calculate();
// })
// calculate()
let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".icon");
let exchangeTxt = document.querySelector(".exchange_rate");
let getBtn = document.querySelector("button");

//adding options tag

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "INR"
        ? "selected"
        : "";

    let optionTag = `<option value="${currency_code}" ${selected}>
    ${currency_code}</option>`;

    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeValue();
});

function getExchangeValue() {
  const amount = document.querySelector("form input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/0d2873bb8ab36307de003f42/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let total = (amountVal * exchangeRate).toFixed(2);
      exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeTxt.innerText = "something went wrong";
    });
}

window.addEventListener("load", () => {
  getExchangeValue();
});

icon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeValue();
});