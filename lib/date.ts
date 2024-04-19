export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const isPM = hours >= 12;
  const formattedHour = isPM ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDate = `${year}년 ${month}월 ${day}일 ${
    isPM ? "오후" : "오전"
  } ${formattedHour}:${formattedMinutes}`;
  return formattedDate;
};
