import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {ConfirmedOperationStatus} from '../../../core/utils/confirm-operation.service';

export interface ConfirmOperationDialogData {
  message: string;
  confirmOverwrite: string;
  operation: Observable<any>;
}

@Component({
  selector: 'app-confirm-operation',
  templateUrl: './confirm-operation.component.html',
  styleUrls: ['./confirm-operation.component.scss']
})
export class ConfirmOperationComponent implements OnInit, OnDestroy {
  alive = true;
  operate = false;
  confirmedOperation: ConfirmedOperationStatus = { success: true };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmOperationDialogData,
    public dialogRef: MatDialogRef<ConfirmOperationComponent>,
    ) { }

  ngOnInit() {
  }

  abord() {
    this.dialogRef.close();
  }

  confirm() {
    this.operate = true;
    this.data.operation.pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      result => this.confirmedOperation.payload = result,
      (err) => {
        this.confirmedOperation.success = false;
        this.confirmedOperation.payload = err;
        this.dialogRef.close(this.confirmedOperation);
      },
      () => this.dialogRef.close(this.confirmedOperation)
    );
  }

  ngOnDestroy(): void {
    this.alive = this.operate = false;
  }
}
