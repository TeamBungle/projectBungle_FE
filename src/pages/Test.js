import React from "react";

function Test() {
  //   var constraints = { audio: true, video: true };

  //   navigator.mediaDevices.getUserMedia(constraints);
  // .then(function (mediaStream) {
  //   var video = document.querySelector("video");
  //   video.srcObject = mediaStream;
  //   video.onloadedmetadata = function (e) {
  //     video.play();
  //   };
  // })
  // .catch(function (err) {
  //   console.log(err.name + ": " + err.message);
  // });
  // always check for errors at the end.

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: true,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const Styles = {
    Video: {
      width: "100%",
      height: "100%",
      background: "rgba(245, 240, 215, 0.5)",
    },
    None: { display: "none" },
  };

  const [playing, setPlaying] = React.useState(undefined);

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    });
  }, []);
  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", padding: "3em" }}>
        <video ref={videoRef} autoPlay style={Styles.Video} />
        <button color="warning" onClick={() => startOrStop()}>
          {playing ? "Stop" : "Start"}{" "}
        </button>
      </div>
    </>
  );
}

export default Test;
