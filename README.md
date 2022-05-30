# 코인고스트 2차 기업 과제

## 커스텀 비디오 플레이어 제작

### 기술 스택

#### <img src="https://img.shields.io/badge/React-61dafb?style=flatsquare&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flatsquare&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=flatsquare&logo=Next.js&logoColor=white">

- React
- TypeScript
- Next.js

### 기능 상세

- 컨트롤바 on/off
  - 영상 영역에서 마우스 이동시 컨트롤바 보이도록 구현
  - 영상 영역에서 마우스가 사라질시 컨트롤바 제거
  - 영상 영역에서 3초 동안 마우스가 아무 반응이 없을시 컨트롤바 제거
- 크롬에서 m3u8 확장자 재생 되도록 기능 구현
- 재생/ 정지 기능
- 볼륨 조절 기능
- 전체화면 ,축소 기능
- 영상 전체길이 표기
- 현재 보고있는 영상 시간 표기
- 프로그레스바 클릭시 해당 시간으로 넘기기
  - 넘기는 도중 영상이 load 중이라면 로딩UI 표시
- 광고 기능 - 특정 시간경과시 광고영상으로 교체되고 광고가 끝날 시 다시 원래 영상보던 시간으로 돌아오기
- 볼륨 음소거 on/off기능
- 볼륨 아이콘 hover 시 볼륨 조절 기능 표시
- keyDown event 이용해서 키보드 이벤트 구현
  - 왼쪽 방향키 event - 영상 시간 -5초
  - 오른쪽 방향키 event - 영상 시간 +5초
  - 스페이스바 evnet - 영상 재생/정지 toggle
