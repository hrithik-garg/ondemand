import { Component } from '@angular/core';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { TranslateModule } from '@ngx-translate/core';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { youTubeVideoId } from 'src/app/constants/constants';

@Component({
  selector: 'app-innovation-section',
  templateUrl: './innovation-section.component.html',
  styleUrls: ['./innovation-section.component.scss'],
  standalone: true,
  imports: [HeadingComponent, TranslateModule, VideoPlayerComponent]
})
export class InnovationSectionComponent {
  
  youTubeVideoId = youTubeVideoId;
}
