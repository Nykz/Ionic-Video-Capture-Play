import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { CaptureImageOptions, MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { CapacitorVideoPlayer } from 'capacitor-video-player';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  video: any;

  constructor(
    private mediaCapture: MediaCapture,
    private file: File
  ) {}

  async startRecording() {
    try {
      let options: CaptureImageOptions = { limit: 1 }
      const data = await this.mediaCapture.captureVideo(options);
      this.video = data[0];
      console.log(this.video);
      let dir = this.video.localURL.split('/');
      dir.pop();
      let fromDir = dir.join('/');
      let toDir = this.file.dataDirectory;
      const response = await this.file.copyFile(fromDir, this.video.name, toDir, this.video.name);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }

  async playRecording() {
    let path = this.file.dataDirectory + this.video.name;
    await CapacitorVideoPlayer.initPlayer({
      mode: 'fullscreen',
      url: path,
      playerId: 'fullscreen',
      componentTag: 'app-home'
    });   
  }

}
