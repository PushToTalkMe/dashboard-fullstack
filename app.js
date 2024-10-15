const arr = ["iva", "iva-m", "yao-m", "iia"];
const str1 =
  "LOG:1728313753,N,yao-m/212.124.29.188:43442 AEAD Decrypt error: bad packet ID";
const str2 =
  "LOG:1728838313,N,Authenticate/Decrypt packet error: packet HMAC authentication failed";

const found = arr.some((substring) => str2.includes(substring));

// Вывод результата
if (found) {
  console.log("Одна из строк из массива найдена в строке.");
} else {
  console.log("Ни одна из строк из массива не найдена в строке.");
}
