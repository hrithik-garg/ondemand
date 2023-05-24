import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  standalone: true,
  imports: [YouTubePlayerModule]
})
export class VideoPlayerComponent implements OnInit{

  @Input() videoId!: string;

  ngOnInit(){
    this.createElementForYoutube();
  }

  createElementForYoutube() {
    const tag = document.createElement('script');
    tag.src = environment.YOUTUBE_VIDEO_ENDPOINT;
    document.body.appendChild(tag);
  }

}
