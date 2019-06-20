const _ = require('lodash');
const React = require('react');
const { render } = require('react-dom');

module.exports = (path, fileName) => {
  const extAll = _.split(fileName, '.');
  const ext = extAll[extAll.length - 1];
  switch (ext) {
    case 'mp4':
      return (
        <video controls src={path} type="video/mp4">
          I'm sorry; your browser doesn't support HTML5 video in MP4 with H.264.
        </video>
      );
      break;
    case 'webm':
      return (
        <video controls src={path} type="video/webm">
          I'm sorry; your browser doesn't support HTML5 video in WebM with
          VP8/VP9.
        </video>
      );
      break;
    case 'mkv':
      return (
        <video controls src={path} type="video/x-matroska, audio/x-matroska">
          I'm sorry; your browser doesn't support HTML5 video in WebM with
          VP8/VP9.
        </video>
      );
      break;

    default:
      return <a href={path}>{fileName}</a>;
  }
};
