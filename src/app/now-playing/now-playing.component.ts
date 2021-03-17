import { Component, OnInit, Output } from '@angular/core';
import { ISong } from '../models/song';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styles: [
  ]
})
export class NowPlayingComponent implements OnInit {

  currentSong: any;
  update: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.currentSong = data;
      });

    this.update = setInterval(() => {
      this.spotifyService.getCurrentSong()
        .subscribe(data => {
          this.currentSong = data;
        });
    }, 5000);
  }
}

