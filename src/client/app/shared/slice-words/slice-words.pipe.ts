import { Pipe, PipeTransform } from '@angular/core';
/*
 * slices the string  value by nunber of words
 * Takes an wordCount argument that defaults to 1.
 * Usage:
 *   value | slice-words:wordCount
 * Example:
 *   {{ 'this is a long string with many words' |  slice-words:5}}
 *   formats to: 1024
*/
@Pipe({name: 'sliceWords'})
export class SliceWordsPipe implements PipeTransform {
  transform(value: string, wordCount: string): string {
    if(value) {
      let _wordCount = parseInt(wordCount) || 1;
      var words = value.split(' ');
      var terminator =  (words.length > _wordCount) ? ' ...' : '';
      words = words.slice(0, _wordCount);
      var slicedWords = words.join(' ') + terminator;
      return slicedWords;
    }
    return value;
  }
}
