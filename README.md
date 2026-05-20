# 코코바스켓 (COCOBASKET) — ICT 주문·운영 시스템

신선식품 현관배송 서비스 코코바스켓의 자체 개발 ICT 시스템입니다.

## 시스템 개요

야채·과일 현관배송 운영 전 과정을 ICT로 자동화한 시스템으로,
대표자(강상영)가 직접 설계·개발·운영하고 있습니다.

## 주요 기능

- 고객용 모바일 주문 인터페이스
- 당일 가격 실시간 반영 (URL 파라미터 자동 처리)
- 재고 소진 자동 처리 (sold-out 전환)
- 떨이타임 실시간 적용
- 지역별 배송 스케줄 자동화 (오후 1시 기준 익일 전환)
- 묶음 특가 UI (품목별 스텝퍼)

## 기술 스택

- Frontend: HTML / JavaScript
- Backend: Netlify Functions (서버리스)
- Database: Supabase (PostgreSQL)
- 배포: Netlify

## 운영 중인 시스템

- 고객 주문: https://cocobasket-coco.netlify.app
- 운영자 관리: https://cocobasket-danji.netlify.app

## 운영 현황

- 운영 지역: 경기도 고양,운 일대
- 배송 방식: 지역별 요일배송
- 주문 채널: 카카오 오픈채팅 + 자체 주문 시스템
