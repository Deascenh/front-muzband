import {Injectable} from '@angular/core';
import {map, share} from 'rxjs/operators';
import {interval, Observable} from 'rxjs';
import {Moment} from 'moment';
import * as moment from 'moment';

/**
 * Only composed of function returning Observables
 * of string in a "Clock format" as "hh:mm:ss"
 */
@Injectable()
export class ClockCountdownService {
  timer: number;

  constructor() { }

  public static inClockFormat(timestamp: number): string {
    const HOUR = 3600000;
    const MINUTE = 60000;
    const SECOND = 1000;
    let clock = '';
    if (timestamp > HOUR) {
      clock += Math.round(timestamp / HOUR).toString().padStart(2, '0') + ':';
      timestamp %= HOUR;
    }
    if (timestamp > MINUTE) {
      clock += Math.round(timestamp / MINUTE).toString().padStart(2, '0') + ':';
      timestamp %= MINUTE;
    }
    if (timestamp > SECOND) {
      clock += Math.round(timestamp / SECOND).toString().padStart(2, '0');
    }
    return clock;
  }

  startUntil(time: string): Observable<string> {
    const toMoment: Moment = moment(time);
    return interval(1000).pipe(
      map(() => {
        const diff = toMoment.diff(moment());
        return ClockCountdownService.inClockFormat(diff);
      }),
      share()
    );
  }
}
