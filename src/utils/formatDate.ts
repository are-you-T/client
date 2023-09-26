/**
 * 작성자명 : 원종석
 * 작성일자 : 2023-08-28 (월)
 * 작성내용 : Date 객체를 전달 받아 특정 형태의 날짜 string으로 변환 후 반환한다.
 * @param {Date | string} date 날짜
 * @returns "YYYY-MM-DD" 형태의 string 데이터
 */
const formatDateToString = (date: Date | string): string => {
    if (typeof date === "string") date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 하고 2자리로 포맷
    const day = String(date.getDate()).padStart(2, "0"); // 일자를 2자리로 포맷

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

/**
 * 작성자명 : 원종석
 * 작성일자 : 2023-08-28 (월)
 * 작성내용 : UTC 시간으로 들어오는 정보들을 한국 시간으로 변환한다.
 * @param {Date} date 날짜
 * @returns "YYYY-MM-DD" 형태의 string 데이터
 */
const setKoreaTime = (date: Date): string => {
    const utcDate: Date = new Date(date);

    // 한국 시간으로 변환
    const koreaTimeOffset: number = 9 * 60 * 60 * 1000; // 한국은 UTC+9
    const koreaDate: Date = new Date(utcDate.getTime() + koreaTimeOffset);

    // 한국 시간을 원하는 형식으로 포맷
    const formattedDate = formatDateToString(koreaDate);
    return formattedDate;
};

export { formatDateToString, setKoreaTime };
