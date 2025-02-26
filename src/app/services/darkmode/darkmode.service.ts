import { inject, Injectable, signal, Signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  //app component
  DARK_TOGGLE = signal(false);
  toggleDarkModeChange() {
    this.DARK_TOGGLE.set(!this.DARK_TOGGLE());
  }
}
