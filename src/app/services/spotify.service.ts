import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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
    private http: HttpClient,
    private cookieService: CookieService) { }

  requestAuth() {
    window.location.href = this.authUrl;
  }

  logout() {
    this.cookieService.delete('token');
    window.location.href = '/';
  }

  setToken(token: string) {
    this.cookieService.set('token', token, 30);
  }

  getAuth(): boolean {
    return this.cookieService.check('token');
  }

  getToken(): string {   
    return this.cookieService.get('token');
  }

  getCurrentSong(): Observable<ISong> {    
    const headerDict = {
      'Authorization': 'Bearer ' + this.getToken()
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const nowPlayingUrl = this.baseNowPlayingUrl + '?market=US'; 

    return this.http.get(nowPlayingUrl, requestOptions).pipe(
      map((res) => {
        if(res != null) {
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
        } else {
          throw new Error("no song playing");
        }
      })
    );
  }

  getRecommendations(song: ISong) {
    const headerDict = {
      'Authorization': 'Bearer ' + this.getToken()
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const recommendationsUrl = this.baseRecommendationUrl +
    '?limit=9&market=US&seed_artists=' + song.artistId + 
    '&seed_tracks=' + song.trackId;

    return this.http.get(recommendationsUrl, requestOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  playSong(uri: string) {
    const headerDict = {
      'Authorization': 'Bearer ' + this.getToken()
    }

    const data = {
      "context_uri": uri,
      "position_ms": 0
    }
    
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    const playUrl = 'https://api.spotify.com/v1/me/player/play';

    return this.http.put(playUrl, data, requestOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSongInformation(uri: string) {
    const headerDict = {
      'Authorization': 'Bearer ' + this.getToken()
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const getSongInformationUrl = 'https://api.spotify.com/v1/audio-features/' + uri;

    return this.http.get(getSongInformationUrl, requestOptions).pipe(
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
