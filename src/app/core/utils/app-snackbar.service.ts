import { Injectable } from '@angular/core';
import {Instrument, Music, User} from '../models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AppSnackbarService {
  public static readonly GENERIC_SAVE_MESSAGE = 'La sauvegarde est effectuée !';
  public static readonly GENERIC_DELETE_MESSAGE = 'La suppression est effectuée !';
  public static readonly SNACKBAR_PANEL_CLASS = 'operation-success-snackbar';

  constructor(private snackBar: MatSnackBar) { }

  public static getSaveSuccessMessage(resource: any = null): string {
    return resource !== null && typeof resource.toString === 'function'
      ? 'La sauvegarde de \"' + resource.toString() + '" est effectuée !'
      : AppSnackbarService.GENERIC_SAVE_MESSAGE;
  }

  private static getResource(className: string, body: any): any {
    let resource: any;
    switch (className) {
      case 'User':
        resource = new User(body);
        break;
      case 'Music':
        resource = new Music(body);
        break;
      case 'Instrument':
        resource = new Instrument(body);
        break;
      default:
        resource = null;
        break;
    }
    return resource;
  }

  /**
   * /!\ Experimental use
   * TODO Find a better way to display a related
   *  to the Entity saving success message. Because we
   *  are too early to be within the scope of class manipulation.
   *  => The following getResource() function is too generic and
   *  too dangerous to be declared and used here in this way.
   */
  public displaySaveSuccess(body: any): void {
    const className = body['@type'] ? body['@type'] : null;
    let message = null;

    if (className !== null) {
      const resource = AppSnackbarService.getResource(className, body);
      message = AppSnackbarService.getSaveSuccessMessage(resource);
    }

    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [AppSnackbarService.SNACKBAR_PANEL_CLASS],
    });
  }

  public displayDeleteSuccess(): void {
    this.snackBar.open(AppSnackbarService.GENERIC_DELETE_MESSAGE, '', {
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [AppSnackbarService.SNACKBAR_PANEL_CLASS],
    });
  }
}
