# 🎨 𝕏 Clone 
☕️ **𝕏 클론 웹사이트**  
🔹 **개인 프로젝트**  
📅 **개발 기간:** 2023.07.14 ~ 2023.07.24  

<br/>

## 📝 Project Introduce
Firebase를 공부하기 위해 제작한 웹사이트입니다.

<br/>

## 🚀 Getting Started
### 📦 Installation  
```bash
$ git clone https://github.com/seung-mii/X-clone.git
$ cd X-clone
```


### 🖥 Execution
``` bash
npm install
npm run dev
```

<br/>

## 🔧 Tech Stack
### ⚙️ Environment  
<p align="left">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
</p>

### 🛠️ Development  
<p align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/NoSQL-008000?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
</p>

### ☁️ Cloud Services  
<p align="left">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/Cloud Firestore-FFA000?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/Authentication-FF6F00?style=for-the-badge&logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/Hosting-FF7043?style=for-the-badge&logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/Cloud Storage-4DB6AC?style=for-the-badge&logo=googlecloud&logoColor=white">
</p>



<br/>


## ✨ Key Features
### 💡 사용자 로그인
- Firebase Authentication을 사용하여 사용자 로그인 및 회원가입 구현했습니다.
- 간편한 인증 프로세스인 Github OAuth를 포함하여 다양한 로그인 옵션 제공합니다.
- 인증된 사용자만 특정 페이지에 접근 가능하도록 설정했습니다


### 💡 트윗 작성 및 게시
- Tweet 컴포넌트를 통해 사용자가 텍스트 입력 후 트윗을 작성하도록 구현했습니다.
- Firebase Firestore를 사용해 트윗 및 사용자 정보를 저장하고 실시간 업데이트하여 반영합니다.
- Timeline 컴포넌트를 사용해 게시된 트윗들을 시간 순서대로 표시합니다.
- useEffect와 Firebase SDK를 활용해 데이터 상태를 자동 갱신합니다.
- 본인이 작성한 트윗에 한하여 삭제가 가능합니다.
- Post 컴포넌트를 사용해 개별 트윗 게시물을 렌더링합니다.


### 💡 프로필 관리
- Firestore와 연동해 프로필 데이터를 동기화합니다.
- ProtectedRoute를 활용하여 인증된 사용자만 프로필 페이지에 접근하도록 제어했습니다.


<br/>


## 🏛️ Architecture
### 📂 디렉토리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── tsconfig.json
├── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── firebase.ts
    ├── routes/
    │   ├── create-account.tsx
    │   ├── home.tsx
    │   ├── login.tsx
    │   └── profile.tsx
    └── components/
        ├── tweet.tsx
        ├── timeline.tsx
        ├── post.tsx
        ├── protected-route.tsx
        ├── layout.tsx
        ├── loading.tsx
        ├── github-btn.tsx
        └── auth-components.tsx

```

<br/>

<p align="right">
  <a href="https://github.com/seung-mii/x-clone/tree/main">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fseung-mii%2Fx-clone&count_bg=%23748DA6&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false">
  </a>
</p>
