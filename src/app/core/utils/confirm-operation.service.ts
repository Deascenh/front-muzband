import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmOperationComponent} from '../../shared/components/confirm-operation/confirm-operation.component';

export interface ConfirmedOperationStatus {
  success: boolean | undefined;
  payload?: any | undefined;
}

@Injectable()
export class ConfirmOperationService {

  constructor(
    private dialog: MatDialog,
  ) { }

  confirmDelete(message: string, operation: Observable<any>): Observable<ConfirmedOperationStatus> {
    const dialog = this.dialog.open(ConfirmOperationComponent, {
      data: { message, operation },
      disableClose: true,
    });
    return dialog.afterClosed();
  }
}
