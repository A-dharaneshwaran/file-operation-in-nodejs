const text = "My Aadhaar is 123412341234 and my old number 5678901234";
const match = text.match(/\b\d{12}\b/);

console.log(match[0]); // "123412341234"
