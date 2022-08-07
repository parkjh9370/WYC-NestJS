# 🏕️ WYC - NestJS API (08.02 ~)

### 🔎 토이 프로젝트 설명

- 기존 Node.js 구축한 WYC 프로젝트 서버를 **Nest.js** 로 변경

&nbsp;

### 🖥 설치 및 실행

```
$ npm install
$ npm run start:dev
```

&nbsp;

### 🤫 얻고자 하는 바

- NestJS DI 프레임워크 활용방법과 **_Module, Controller, Provider의 상관관계_** 를 이해하고 OOP 적용
- NestJS에서 제공해주는 interface인 **_Filter, Pipes, Guards, Interceptor, decorator_** 를 적용해 Request lifecycle 이해
- DDD(Domain Driven Development) 방식을 적용하여 class간 커플링을 최소화 하고, 테스트가 용이한 환경을 제공

---

&nbsp;

### ✅ API (현재까지 구현한 기능)

#### 1. 유저 - API

- 회원가입, 일반 로그인
- 카카오 로그인

#### 2. 게시글 - API

- 사진 업로드 (Multer, form-data 처리, 서버에 파일 저장 )
- 게시글 등록 (게시글, 추가 옵션, 위치 데이터)
- 메인/상세 페이지 데이터 제공

#### 3. 댓글, 좋아요 - API

- 댓글, 좋아요 CRUD

&nbsp;

> 📌 Common Request Lifecycle
>
> - Middleware : 요청, 응답 로깅 (ip, method, statusCode, url)
> - Guard : 로그인 유저 토큰 인증 (+ JWT 토큰)
> - decorator(user) : 인증된 토큰으로 유저 데이터 추출 (Custom)
> - interceptors : 요청 성공 시 응 응답 형태
> - Exception filters : 요청 실패 시 응답 에러 Response Code, 메세지

&nbsp;

---

&nbsp;

### ❗ 어려웠던점

- NestJS 프레임워크, 객체 지향 프로그래밍 방식(+DI) 타입스크립트 문법에 대한 이해 (+ TypeORM)

- 기존 Node.js의 함수형 프로그래밍 방식에서 벗어나 Nest.js의 DI 프레임워크, interface를 활용해 요청, 응답 데이터와 로직을 핸들링하고 처리하는 부분

- 데이터와 에러 처리 응답 형태가 달라짐에 따른 프론트엔드 코드 수정

&nbsp;

### 💪 배운점

- 프로젝트 규모가 커질수록 도메인 역할을 분리함으로써, 이에 대해 빠르게 파악할 수 있고, 유지/보수에 용이하다.

- Request, Response, Data Transter 과정에서 객체 간의 역할과 책임을 세분화, 규격화 시킬수록 Side Effect를 최소화 시키고 탄탄한 백엔드 서버를 구축할 수 있다.

&nbsp;

### 💡 현재까지 느낀점

대부분 처음 접하고 적용해보는 내용인만큼 생각지 못한 에러도 많이 만나고 쉽지 않다.

하지만 직접 코드를 작성해보면서 문서에서만 접했던 Nestjs, OOP 등의 장점을 조금이나마 이해할 수 있었던 것같다.

익숙해 질 수 있도록 코드를 많이 보고 작성해봐야 겠다는 것을 느꼈고,

DDD 패턴은 모두 적용해보지 못했는데 지속적으로 이해하고 코드를 작성해 나가봐야 겠다.
