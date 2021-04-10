import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISong } from '../models/song';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {



  private token = "";
  private isAuthed: boolean = false;

  private clientId = environment.clientId;
  private baseAuthUrl = environment.baseAuthUrl;
  private baseUrl = environment.baseUrl;
  private baseNowPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
  private baseRecommendationUrl = 'https://api.spotify.com/v1/recommendations';

  private redirectUrl = environment.redirectUrl;
  private scope = 'user-read-playback-state app-remote-control streaming'

  public currentSong: ISong = {
    title: '',
    artists: [],
    album: ''
  };

  private authUrl = this.baseAuthUrl + '?client_id='
    + this.clientId + '&response_type=token&redirect_uri='
    + this.redirectUrl + '&scope='
    + this.scope;


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

  getCurrentSong(): Observable<ISong> {
    const headerDict = {
      'Authorization': 'Bearer ' + this.token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const nowPlayingUrl = this.baseNowPlayingUrl + '?market=US';

    return this.http.get(nowPlayingUrl, requestOptions).pipe(
      map((res) => {
        var song: ISong = {
          trackId: (res as any).item.id,
          artistId: (res as any).item.artists[0].id,
          albumArtUrl: (res as any).item.album.images[0].url,
          title: (res as any).item.name,
          album: (res as any).item.album.name,
          artists: (res as any).item.artists
        }
        this.currentSong = song;
        return song;
      })
    );
  }

  getRecommendations(song: ISong) {
    const headerDict = {
      'Authorization': 'Bearer ' + this.token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const recommendationsUrl = this.baseRecommendationUrl + '?limit=9&market=US&seed_artists=' + song.artistId + '&seed_tracks=' + song.trackId;

    return this.http.get(recommendationsUrl, requestOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  playSong(uri: string) {
    const headerDict = {
      'Authorization': 'Bearer ' + this.token
    }

    const data = {
      "context_uri": uri,
      "position_ms": 0
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),

    };

    const playUrl = 'https://api.spotify.com/v1/me/player/play';

    return this.http.put(playUrl, data, requestOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // skipSong() {
  //   const headerDict = {
  //     'Authorization': 'Bearer ' + this.token
  //   }

  //   const requestOptions = {
  //     headers: new HttpHeaders(headerDict),
  //   };

  //   const skipUrl = 'https://api.spotify.com/v1/me/player/next';

  //   return this.http.post(skipUrl, requestOptions).pipe(
  //     map((res) => {

  //     })
  //   );
  // }
}
