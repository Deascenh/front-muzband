import {Injectable} from '@angular/core';
import {map, share, takeWhile} from 'rxjs/operators';
import {interval, Observable} from 'rxjs';
import {Moment} from 'moment';
import * as moment from 'moment';

export enum EMilliseconds {
  Hour = 3600000,
  Minute = 60000,
  Second = 1000,
}

@Injectable()
export class ClockCountdownService {

  private static readonly endClockFormat: string = '00:00';
  private static readonly period: number = 1000;

  /**
   * The function returns the result of the Euclidean division
   * of the timestamp received in the unit of time passed as
   * a parameter. Then it converts it into a character string
   * always showing 2 digits and a time separator if needed.
   *
   * @param { number } timestamp
   * @param { EMilliseconds } TimeUnit Format "nn[:]"
   */
  public static inClockDigitFormat(timestamp: number, TimeUnit: EMilliseconds): string {
    return (Math.floor(timestamp / TimeUnit).toString().padStart(2, '0') || '00')
      + (TimeUnit !== EMilliseconds.Second ? ':' : '');
  }

  /**
   * Returns a string type clock from the received timestamp
   * in format "[hh:]mm:ss". Square brackets in the previous
   * example indicate that if the timestamp is less than one
   * hour, the time does not appear in the clock.
   *
   * @param { number } timestamp
   * @return { string } Format "[hh:]mm:ss"
   */
  public static inClockFormat(timestamp: number): string {
    let clock = '';

    if (timestamp <= 0) {
      return ClockCountdownService.endClockFormat;
    }

    if (timestamp > EMilliseconds.Hour) {
      clock += ClockCountdownService.inClockDigitFormat(timestamp, EMilliseconds.Hour);
      timestamp %= EMilliseconds.Hour;
    }
    if (timestamp > EMilliseconds.Minute) {
      clock += ClockCountdownService.inClockDigitFormat(timestamp, EMilliseconds.Minute);
      timestamp %= EMilliseconds.Minute;
    }
    clock += ClockCountdownService.inClockDigitFormat(timestamp, EMilliseconds.Second);

    return clock;
  }

  /**
   * It returns every second a string type clock indicating the time
   * remaining between the time passed in parameter and now.
   *
   * @param { any } time Any value that can instantiate a Moment object
   * @return { Observable<string> }
   */
  startUntil(time: any): Observable<string> {
    const toMoment: Moment = moment(time);

    return interval(ClockCountdownService.period).pipe(
      map(() => ClockCountdownService.inClockFormat(toMoment.diff(moment()))),
      takeWhile((clockFormat: string) => clockFormat !== ClockCountdownService.endClockFormat),
      share(),
    );
  }
}
