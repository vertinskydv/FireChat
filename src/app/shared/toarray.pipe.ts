import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let result = [];
      for (let item of value) {
        result.push(item);
      }
      console.log(result);
      return result;
    }
  }
}
