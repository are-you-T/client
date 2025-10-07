export async function handleShareClick() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "링크를 공유합니다.",
        url: window.location.href
      });
      // console.log("링크를 공유했습니다!");
    } catch (error) {
      console.error("링크 공유에 실패했습니다.", error);
    }
    //window.location.href TestResult 테스트 후에 확인 필요
  } else {
    // Web Share API를 지원하지 않는 경우
    // 대체 동작을 수행합니다.
    await share(window.location.href);
  }
}

export async function share(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("링크가 복사되었습니다!");
  } catch (e) {
    alert("초대코드 복사에 실패했습니다ㅜㅜ");
  }
}
