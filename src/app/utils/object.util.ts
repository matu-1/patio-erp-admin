export class ObjectUtils {
  /**
   * Clear values: null, undefined, '' and empty array
   */
  static clear(obj: Record<string, any>) {
    const newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (
        !newObj[key] ||
        (Array.isArray(newObj[key]) && newObj[key].length == 0)
      )
        delete newObj[key];
    });
    return newObj;
  }
}
