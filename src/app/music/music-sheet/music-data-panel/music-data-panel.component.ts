import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Music} from '../../../core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MusicService} from '../../../core/data/music.service';
import {ConfirmOperationService} from '../../../core/utils/confirm-operation.service';
import {IAppState} from '../../../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {RemoveMusic} from '../../../core/store/music/music.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-music-data-panel',
  templateUrl: './music-data-panel.component.html',
  styleUrls: ['./music-data-panel.component.scss']
})
export class MusicDataPanelComponent implements OnChanges {
  @ViewChild('dataMode', {static: false}) dataMode: MatSlideToggle;

  private pHydrated: Music;

  @Input() set music(music: Music) {
    if (music instanceof Music) {
      this.pHydrated = music;
    }
  }

  get music(): Music {
    return this.pHydrated;
  }

  musicForm: FormGroup;
  dataPanelOpen = true;
  readonly = true;

  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private confirmOperation: ConfirmOperationService,
    private store: Store<IAppState>,
    private router: Router,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    this.watchDataMode();
  }

  delete() {
    const deleteOperation = this.musicService.delete(this.music);
    const message = `Souhaitez vous vraiment supprimer "${this.music.title}" ?`;
    this.confirmOperation.confirmDelete(message, deleteOperation)
      .subscribe(result => {
        if (result.success && result.payload === null) {
          this.store.dispatch(new RemoveMusic(this.music));
          this.router.navigateByUrl('/home');
        }
      });
  }

  private initForm() {
    this.musicForm = this.formBuilder.group({
      name: ['', Validators.required],
      artiste: [''],
    });
  }

  private watchDataMode() {
    if (this.dataMode) {
      this.dataMode.change.subscribe(editMode => {
        this.readonly = !editMode.checked;
      });
    }
  }
}
