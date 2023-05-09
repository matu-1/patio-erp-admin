export type ArrayGroup<T> = {
  [key: string]: T[];
};

export class ArrayUtils {
  static group<T>(data: T[], prop: string, parseProp?: (item: any) => any) {
    const dataByProp: ArrayGroup<T> = {};
    data.forEach((item: any) => {
      const valueProp = parseProp ? parseProp(item[prop]) : item[prop];
      if (!dataByProp[valueProp]) dataByProp[valueProp] = [];
      dataByProp[valueProp].push(item);
    });
    return dataByProp;
  }
}
