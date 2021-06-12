import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 2) return value; // tiene que introducir 2 letras mínimo
    const resultPosts = [];
    for (const post of value) {
      if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };

    return resultPosts;


  }

}
