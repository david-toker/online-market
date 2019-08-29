import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productMarker'
})
export class ProductMarkerPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {return value;}
    var re = new RegExp(args, 'gi');
    return value.replace(re, "<mark>$&</mark>");
}
}
