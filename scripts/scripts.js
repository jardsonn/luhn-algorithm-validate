const results = document.getElementById("results");
const textareaCC = document.getElementById("digits-textarea-in");
const btnVerify = document.getElementById("btn-verify");

function digitValidity(digit, isValid) {
  return `<span class="${isValid ? "valid" : "invalid"}">${digit}</span> `;
}

function prepareTextarea(e) {
  const value = e.value;
  const charNotAllowed = /[^0-9,| ]/g;
  if (value.trim().length == 0) {
    btnVerify.disabled = true;
    results.innerHTML = "";
  }else{
    btnVerify.disabled = false;
  }
  if (charNotAllowed.test(value)) {
    e.value = value.replace(charNotAllowed, "");
  }
}

function onlyKeysAllowed(e) {
  return !(
    (e.which < 48 || e.which > 57) &
    (e.which != 32) &
    (e.which != 44) &
    (e.which != 8) &
    (e.which != 124)
  );
}

function luhnAlgorithm(credCard) {
  let digits = credCard.split("").reverse();
  digits = digits.filter((s) => /\S/.test(s)); // remove whitespace

  let sum = 0;
  digits.forEach((digit, i) => {
    if (i % 2 === 1) {
      digits.splice(i, 1, 0);
      let double = parseInt(digit * 2).toString();
      double.split("").forEach((digitDouble) => {
        sum += parseInt(digitDouble);
      });
    }
  });
  digits.forEach((digit) => (sum += parseInt(digit)));

  return sum % 10 == 0;
}

function setValidity(credCard) {
  // const allCC = credCard.split(",");
  let allCC = credCard.split(/[^0-9 ]/g);
  allCC = allCC.filter((s) => /\S/.test(s)); // remove whitespace

  let result = "";
  console.log(allCC);
  allCC.forEach((cc) => {
    const numberCC = cc.trim();
    const isValid = luhnAlgorithm(numberCC);
    result += digitValidity(numberCC, isValid);
  });
  results.innerHTML = `<p>${result}</p>`;
}

function verifyCC() {
  btnVerify.addEventListener("click", () => {
    const value = textareaCC.value;
    setValidity(value);
  });
}

verifyCC();
