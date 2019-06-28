const path = require('path');
const React = require('react');
const { render } = require('react-dom');
const videojs = require('video.js');

module.exports = (pathName, fileName) => {
  const splitSlash = 'files/' + pathName.substring(12);

  const extAll = fileName.split('.');
  const ext = extAll[extAll.length - 1];
  console.log('extAll: ', extAll, '\r\next: ', ext);
  switch (ext) {
    case 'mp4':
      return (
        <div className="poop">
          <video
            controls
            src={splitSlash}
            type="video/mp4"
            width="400"
            height="300"
          >
            I'm sorry; your browser doesn't support HTML5 video in MP4 with
            H.264.
          </video>
          <p className="naming">{fileName}</p>
        </div>
      );
      break;
    case 'webm':
      return (
        <div className="poop">
          <video
            controls
            src={splitSlash}
            type="video/webm"
            width="400"
            height="300"
          >
            I'm sorry; your browser doesn't support HTML5 video in WebM with
            VP8/VP9.
          </video>
          <p className="naming">{fileName}</p>
        </div>
      );
      break;
    case 'mkv':
      return (
        <div className="poop">
          <video
            controls
            src={splitSlash}
            type="video/x-matroska, audio/x-matroska"
            width="400"
            height="300"
          >
            I'm sorry; your browser doesn't support HTML5 video in WebM with
            VP8/VP9.
          </video>
          <p className="naming">{fileName}</p>
        </div>
      );
      break;

    default:
      return <a href={splitSlash}>{fileName}</a>;
  }
};
