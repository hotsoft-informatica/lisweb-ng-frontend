import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'safeurl',
    standalone: true
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }
  transform(value: any, prefix = '') {
    return this.domSanitizer.bypassSecurityTrustUrl(prefix + value);
  }

}
