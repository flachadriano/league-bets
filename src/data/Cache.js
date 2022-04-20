export default class Cache {
  static cache = {};

  static async get(url, headers) {
    if (!Cache.cache[url]) {
      Cache.cache[url] = await fetch(url, headers).then(r => r.json());
    }
    return Promise.resolve(Cache.cache[url]);
  }
}
