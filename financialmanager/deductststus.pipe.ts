import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Usage:
 *   value | deductStatus:exponent
 * Example:
 *   {{ 2 | deductStatus }}
*/
@Pipe({ name: 'deductStatus' })
export class DeductStatusPipe implements PipeTransform {
    transform(value: number): string {
        let status;
        switch (value) {
            case -1:
                status = '--请选择状态--';
                break;
            case 0:
                status = '待审核';
                break;
            case 1:
                status = '待打款';
                break;
            case 2:
                status = '打款完成';
                break;
            default:
                status = '--请选择状态--';
        }
        return status;
    }
}