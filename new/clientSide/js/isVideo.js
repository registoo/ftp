const React = require('react');
const videojs = require('video.js');

module.exports = pathName => {
  const fileName = pathName.fileName;
  const splitSlash = 'files/' + pathName.relativeFilePath;
  const ext = pathName.ext;
  switch (ext) {
    // case '.mp4':
    //   return (
    //     <div className="poop">
    //       <video
    //         controls
    //         src={splitSlash}
    //         type="video/mp4"
    //         width="400"
    //         height="225"
    //       >
    //         I'm sorry; your browser doesn't support HTML5 video in MP4 with
    //         H.264.
    //       </video>
    //       <p className="naming">{fileName}</p>
    //     </div>
    //   );
    //   break;
    // case '.webm':
    //   return (
    //     <div className="poop">
    //       <video
    //         controls
    //         src={splitSlash}
    //         type="video/webm"
    //         width="400"
    //         height="300"
    //       >
    //         I'm sorry; your browser doesn't support HTML5 video in WebM with
    //         VP8/VP9.
    //       </video>
    //       <p className="naming">{fileName}</p>
    //     </div>
    //   );
    //   break;

    default:
      return (
        <div className="comfortaa">
          <a href={splitSlash}>{fileName}</a>
        </div>
      );
  }
};
