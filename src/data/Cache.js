export default class Cache {
  static cache = {};

  static async get(url, headers) {
    if (Cache.cache[url]) {
      return Promise.resolve(Cache.cache[url]);
    } else {
      const data = await fetch(url, headers).then(r => r.json());
      Cache.cache[url] = data;
      return Promise.resolve(data);
    }
  }
}
