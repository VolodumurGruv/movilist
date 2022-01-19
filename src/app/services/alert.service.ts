import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
    const clearTime = setTimeout(() => {
      clearTimeout(clearTime);
      this.clear();
    }, 5000);
  }

  clear() {
    this.messages = [];
  }
}
