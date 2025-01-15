// const BASE_URL =
//   "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

//   console.log(BASE_URL)


// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");

// for(select of dropdowns){
//   for (currCode in countryList){
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if(select.name ===  "from" && currCode === "USD"){
//       newOption.selected = "selected";
//     }else if(select.name ===  "to" && currCode === "INR"){
//       newOption.selected = "selected";
//     }
//     select.append(newOption);

//     select.addEventListener("change", (evt) => {
//       updateFlag(evt.target);
//     })
//   }
// }


// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");

//   img.src = newSrc;

// }

// btn.addEventListener("click", async (evt) =>{
//   evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if(amtVal === "" || amtVal < 1){
//     amtVal = 1;
//     amount.value = "1";
//   };


//   // console.log(fromCurr.value,toCurr.value);
//   const URL = `${BASE_URL}/${fromCurr.value.toLowercase()}/${toCurr.value.toLowercase()}.json`;

//   let response = await fetch(URL);

//   let data = await response.json();

//   console.log(data);


// });





const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate the currency dropdowns
dropdowns.forEach(select => {
  for (const currCode in countryList) {
    let option = new Option(currCode, currCode);
    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;
    select.add(option);
  }

  // Update flag when currency changes
  select.addEventListener("change", () => {
    let countryCode = countryList[select.value];
    let flagImg = select.parentElement.querySelector("img");
    flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  });
});

// Handle the conversion on button click
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  
  let amount = document.querySelector(".amount input").value || 1;  // Default amount to 1 if empty
  let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    let data = await response.json();
    let conversionRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    if (conversionRate) {
      let convertedAmount = amount * conversionRate;
      msg.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
      // console.log(`Converted Amount: ${convertedAmount}`);
    } else {
      console.error("Conversion rate not found");
    }
  } catch (error) {
    console.error("Error fetching conversion rate:", error.message);
  }
});









