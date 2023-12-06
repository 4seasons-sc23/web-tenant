<div align=center>
	<img src="https://capsule-render.vercel.app/api?type=waving&color=#3e3582&height=200&section=header&text=Tenant%20Page&fontSize=80&fontAlignY=36" />	
</div>
<div align=center>
	<h3>📚 Tech Stack 📚</h3>
	<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
	<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
	<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
	<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>

</div>
<br>
<div align=center>
	<p>🛠 Tools 🛠</p>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
	<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
</div>
<br>

## 개요
실시간 라이브 스트리밍 SaaS 프로젝트 "Instream" 중 테넌트 페이지 프로젝트입니다.
<br/>
<br/>

## 주요 기능
+ sdk 컴포넌트 사용을 위한 어플리케이션 생성 및 key값 발급
+ InStream 서비스 관련 문의하기 기능 제공
+ 사용량 내역 조회
</br>

## 주요 특징
+ pagination등 공통 컴포넌트의 사용.
<br/>

## docker + nginx로 배포하는 과정

이후 터미널에서 다음 명령어를 실행합니다.

```shell
docker build --tag web-tenant .
docker run -d -p 3001:80 --name web-tenant web-tenant
```
