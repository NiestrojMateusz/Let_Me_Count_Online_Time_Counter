export const formattedTime = (sec) => {
  const seconds = ('0' + sec % 60).slice(-2);
  const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

  return minutes + ':' + seconds;
}

export const formatPickerVals = (value) => {
  const [hours, minutes, seconds] = value.format('HH:mm:ss').split(':');
  return  (parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10));
}
