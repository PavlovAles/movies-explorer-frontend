export default function formatDuration(duration) {
  const hours = Math.floor(duration / 60);
  const hoursStr = hours ? `${hours}ч ` : '';

  const minutes = duration - hours * 60;
  const minutesStr = (minutes === 0) ? '00м' : `${minutes}м`;
  
  return hoursStr + minutesStr;
}