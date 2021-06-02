import { Component, OnInit, Output } from '@angular/core';
import { ISong } from '../models/song';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styles: [],
})
export class NowPlayingComponent implements OnInit {
  isPlayingSong: boolean = false;
  currentSong: any;
  currentSongInformation: any;
  update: any;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {

    this.updateCurrentlyPlayingSong();

    this.update = setInterval(() => {
      this.updateCurrentlyPlayingSong();
    }, 5000);
  }

  updateCurrentlyPlayingSong() {
    this.spotifyService.getCurrentSong().subscribe(
      (data) => {
        this.isPlayingSong = true;
        console.log(data);
        
        if (this.currentSong?.trackId != data.trackId) {
          this.currentSong = data;
          this.spotifyService
            .getSongInformation(this.currentSong.trackId)
            .subscribe((data) => {
              this.currentSongInformation = data;
            });
        }
      },
      (err) => {
        this.isPlayingSong = false;
      }
    );
  }
}
