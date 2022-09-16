export abstract class ObjectUtils {
  /**
   * Clear values: null, undefined, '' and empty array
   */
  static clear<T extends Record<string, any> = any>(obj: T) {
    const newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (
        (!newObj[key] && newObj[key] !== 0) ||
        (Array.isArray(newObj[key]) && newObj[key].length == 0)
      )
        delete newObj[key];
    });
    return newObj;
  }
}
