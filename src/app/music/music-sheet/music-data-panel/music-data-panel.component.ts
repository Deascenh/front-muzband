import {Component, Input} from '@angular/core';
import {Music} from '../../../core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MusicService} from '../../../core/data/music.service';
import {ConfirmOperationService} from '../../../core/utils/confirm-operation.service';
import {IAppState} from '../../../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {RemoveMusic} from '../../../core/store/music/music.actions';
import {Router} from '@angular/router';
import {selectUserList} from '../../../core/store/user/user.selectors';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-music-data-panel',
  templateUrl: './music-data-panel.component.html',
  styleUrls: ['./music-data-panel.component.scss'],
  providers: [DatePipe],
})
export class MusicDataPanelComponent {

  private pHydrated: Music;

  @Input() set music(music: Music) {
    if (music instanceof Music) {
      this.pHydrated = music;
      this.initForm();
    }
  }

  get music(): Music {
    return this.pHydrated;
  }

  musicForm: FormGroup;
  dataPanelOpen = false;
  readonly = true;

  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private confirmOperation: ConfirmOperationService,
    private store: Store<IAppState>,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  toggleMode(event) {
    this.readonly = !event.checked;
  }

  delete() {
    const deleteOperation = this.musicService.delete(this.music);
    const message = `Souhaitez vous vraiment supprimer "${this.music.title}" ? \
      Toutes les informations et feuilles de travail associées ne seront plus visibles.`;

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
      title: [this.music.title, Validators.required],
      artist: [this.music.artist || ''],
      creator: [''],
      createdAt: [this.datePipe.transform(this.music.createdAt, 'medium')],
      updatedAt: [this.datePipe.transform(this.music.updatedAt, 'medium')],
    });

    this.store.select(selectUserList)
      .subscribe(users => {
        const nestedCreator = users.find(item => item['@id'] === this.music.creator);
        this.musicForm.patchValue({ creator: nestedCreator.useName() });
      });
  }
}
