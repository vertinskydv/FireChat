import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let result = [];
      for (let key in value) {
        result.push(value[key]);
        console.log(value[key]);
      }
      console.log(result);
      return result;
    }
  }
}
