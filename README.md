# 웨딩홀 신랑신부 시식 예약 관리 서비스

주말 예식 전 시식 일정을 소개하고, 손님이 예약 문의를 남기면
사장이 관리자 화면에서 접수 내역을 확인·확정·삭제하는 서비스입니다.

## 파일 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 고객 페이지 (소개 + 예약 문의 폼) |
| `admin.html` | 관리자 페이지 (로그인 + 접수 내역 관리) |
| `config.js` | Supabase 연결 정보 · 서비스 소개 문구 |
| `style.css` | 공통 스타일 |

## 설치 순서

### 1. Supabase 프로젝트 생성
[supabase.com](https://supabase.com) 에서 새 프로젝트를 만듭니다.

### 2. 테이블 + 권한 정책 만들기
Supabase 대시보드 > **SQL Editor** 에 아래 SQL을 붙여넣고 실행합니다.

```sql
-- 예약 접수 테이블
create table reservations (
  id          bigint generated always as identity primary key,
  name        text not null,
  contact     text not null,
  hope_date   date,
  request     text,
  status      text not null default '대기',
  created_at  timestamptz not null default now()
);

-- RLS(행 단위 보안) 켜기
alter table reservations enable row level security;

-- [손님] 로그인 없이 '접수 남기기'만 허용 (Create)
-- status 를 '대기'로 고정 → 손님이 스스로 '확정' 넣는 것을 차단
create policy "anyone can insert"
  on reservations for insert
  to anon
  with check (status = '대기');

-- [사장] 로그인한 사용자만 조회·수정·삭제 (Read/Update/Delete)
create policy "authenticated can select"
  on reservations for select
  to authenticated using (true);

create policy "authenticated can update"
  on reservations for update
  to authenticated using (true);

create policy "authenticated can delete"
  on reservations for delete
  to authenticated using (true);
```

> 이 정책 덕분에 손님은 접수만 가능하고, 접수 내역 열람·상태변경·삭제는
> 로그인한 사장만 할 수 있습니다.

### 3. 관리자 계정 1개 만들기 + 신규 가입 차단 (보안 필수)
1. 대시보드 > **Authentication > Users > Add user** 에서
   사장님 이메일·비밀번호로 계정 1개를 직접 생성합니다.
2. 대시보드 > **Authentication > Sign In / Providers** 에서
   **"Allow new users to sign up" 을 반드시 끕니다.**
   > 이걸 켜두면 화면에 가입 버튼이 없어도 누구나 API로 가입해
   > 관리자 권한(조회·삭제)을 얻을 수 있습니다. 반드시 꺼야 합니다.

### 4. 연결 정보 입력
대시보드 > **Project Settings > API** 에서 값을 복사해
`config.js` 상단을 수정합니다.

```js
const SUPABASE_URL = "https://xxxx.supabase.co";  // Project URL
const SUPABASE_ANON_KEY = "eyJhbGciOi...";         // anon public key
```

### 5. 실행
`index.html` 을 브라우저로 열면 됩니다.
(로컬 파일로 바로 열거나, GitHub Pages · Netlify 등에 정적 호스팅)

## 기능 요약 (CRUD)

| 기능 | 누가 | 동작 |
|------|------|------|
| 예약 문의 접수 | 손님 (로그인X) | Create |
| 접수 내역 조회 (최신순) | 사장 | Read |
| 상태 변경 (대기→확정) | 사장 | Update |
| 접수 삭제 | 사장 | Delete |
