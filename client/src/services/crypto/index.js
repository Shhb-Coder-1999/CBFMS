import CryptoJS from "crypto-js";

const secretKey = "3e2364b1-7241-4cfd-9d66-40e47cc9a488";

export function encrypt(payload) {
  let data = JSON.stringify(payload);

  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decrypt(payload) {
  if (payload) {
    let bytes = CryptoJS.AES.decrypt(payload, secretKey);

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else return false;
}

export default {
  encrypt,
  decrypt,
};
