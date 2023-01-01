import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipses'
})
export class EllipsesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value) return value;
    if(typeof value === 'string' && value.length > 20) {
      return `${value.substring(0, 20)}...`;
    }
    return value;
  }

}
