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
  currentSongInformation: any;
  update: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.currentSong = data;
        this.spotifyService.getSongInformation(this.currentSong.trackId)
          .subscribe(data => {
            this.currentSongInformation = data;
            console.log(this.currentSongInformation);
            
          });
      });

    

    this.update = setInterval(() => {
      this.spotifyService.getCurrentSong()
        .subscribe(data => {
          if(this.currentSong.trackId != data.trackId){
            this.currentSong = data;
            this.spotifyService.getSongInformation(this.currentSong.trackId)
            .subscribe(data => {
              this.currentSongInformation = data;
            });
          };   
        });
    }, 5000);
  }
}

