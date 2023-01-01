// import React, { useEffect } from "react";

function LoadScript(src) {
  // useEffect(() => {
  // console.log(src);
  var tag = document.createElement("script");
  tag.async = false;
  tag.src = src;
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(tag);
  // }, []);

  // return true;
}

export default LoadScript;
