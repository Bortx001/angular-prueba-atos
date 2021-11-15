import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtml implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(style: any) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}


