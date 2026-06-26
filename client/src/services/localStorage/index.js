import cryptoService from "../crypto";

export default {
  get,
  set,
  clear,
  remove,
};

export function get({ nameSpace, additional = false }) {
  const itemStr = localStorage.getItem(nameSpace);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (item.expiry && now.getTime() > item.expiry) {
    localStorage.removeItem(nameSpace);
    return null;
  }

  if (item.secure) {
    item.value = cryptoService.decrypt(item.value);
  }

  if (additional) return item;
  else return item.value;
}

export function set({ nameSpace, value, ttl = false, secure = true }) {
  const item = {};

  // ttl is in millisecond
  if (ttl) {
    const now = new Date();
    item.expiry = now.getTime() + ttl;
  }

  let oldValue = get({ nameSpace });
  if (oldValue) item.value = { ...oldValue, ...value };
  else item.value = value;

  if (secure) {
    item.secure = true;
    item.value = cryptoService.encrypt(item.value);
  }

  localStorage.setItem(nameSpace, JSON.stringify(item));
}

export function remove(nameSpace) {
  localStorage.removeItem(nameSpace);
}

export function clear() {
  localStorage.clear();
}
