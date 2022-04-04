class LocalCache {
  /** 存储键值对 */
  setCache(key: string, value: any) {
    /** 将值转换成字符串 */
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  /** 取值 */
  getCache(key: string) {
    /** 将值还原成原来 */
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
  }

  /** 删除当前存储的值 */
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  /** 清空整个浏览器的缓存 */
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
