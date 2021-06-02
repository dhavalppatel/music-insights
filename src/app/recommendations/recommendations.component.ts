import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styles: [
  ]
})
export class RecommendationsComponent implements OnInit {
  songs: any;
  currentSong: any;
  update: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.currentSong = data.trackId;
        this.spotifyService.getRecommendations(data)
          .subscribe(data => {
            this.songs = data;
          });
      });

      setInterval(() => {
        this.spotifyService.getCurrentSong()
        .subscribe(data => {
          if(this.currentSong != data.trackId) {
            this.currentSong = data.trackId;
            this.spotifyService.getRecommendations(data)
              .subscribe(data => {
                this.songs = data;
              });
          }
        });                
      }, 2500);
  }

  refreshRecommendations() {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.spotifyService.getRecommendations(data)
          .subscribe(data => {            
            this.songs = data;
          });
      });
  }

  saveToPlaylist() {

  }

  playSong(uri: string) {
    this.spotifyService.playSong(uri)
      .subscribe(data => { });
  }
}
