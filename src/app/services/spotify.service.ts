import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token = "";
  private isAuthed: boolean = false;

  private clientId = '0fec3559ed9b41cda9a33ae742a95624';
  private baseSpotifyAuthUrl = 'https://accounts.spotify.com/authorize';
  private redirectUrl = 'http://localhost:4200/callback'
  private authUrl = this.baseSpotifyAuthUrl + '?client_id=' + this.clientId + '&response_type=token&redirect_uri=' + this.redirectUrl;

  constructor(private router: Router) { }

  requestAuth() {
    window.location.href = this.authUrl;
  }

  setToken(token: string) {
    this.token = token;
    this.isAuthed = true;
  }

  getIsAuthed(): boolean {
    return this.isAuthed;
  }

  getToken(): string {
    return this.token;
  }

  getCurrentSong(): string {
    return "";
  }
}
