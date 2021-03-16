import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {



  private token = "";
  private isAuthed: boolean = false;

  private clientId = '0fec3559ed9b41cda9a33ae742a95624';
  private baseAuthUrl = 'https://accounts.spotify.com/authorize';
  private baseNowPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
  private redirectUrl = 'http://localhost:4200/callback'
  private scope = 'user-read-playback-state'

  private authUrl = this.baseAuthUrl + '?client_id='
  + this.clientId + '&response_type=token&redirect_uri='
  + this.redirectUrl + '&scope='
  + this.scope;

  private nowPlayingUrl = this.baseNowPlayingUrl + '?market=ES';

  constructor(private router: Router,
              private http: HttpClient) { }

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

  getCurrentSong() {
    const headerDict = {
      'Authorization': 'Bearer ' + this.token
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get(this.nowPlayingUrl, requestOptions);
  }
}
