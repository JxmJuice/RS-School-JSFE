let videos = document.querySelector(".small_video");
const bigVideo = document.querySelector(".zoo__video_big");

videos.addEventListener("click", function () {
  
  console.log(event.target);
  let temp = bigVideo.src;
  bigVideo.src = event.target.parentElement.querySelector("iframe").src;
  event.target.parentElement.querySelector("iframe").src = temp;
  console.log(temp);
});
