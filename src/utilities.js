const formattedTime = (sec) => {
  const seconds = ('0' + sec % 60).slice(-2);
  const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

  return minutes + ':' + seconds;
}

export default formattedTime;