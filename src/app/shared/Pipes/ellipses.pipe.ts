import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipses'
})
export class EllipsesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value) return value;
    let limit: any = 20;
    if(args.length > 0)
        limit = args[0];

    if(typeof value === 'string' && value.length > 20) {
      return `${value.substring(0, limit)}...`;
    }
    return value;
  }

}
