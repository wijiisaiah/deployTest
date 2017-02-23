import { Pipe, PipeTransform } from '@angular/core';

import { STATUS } from '../constant/constants';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    private statuses = STATUS;
    transform(statusNum: number) {
        return this.statuses[statusNum];
    }
}  