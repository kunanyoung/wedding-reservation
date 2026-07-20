// ============================================================
// Supabase 설정
// ------------------------------------------------------------
// 아래 두 값을 본인의 Supabase 프로젝트 값으로 교체하세요.
//   Supabase 대시보드 > Project Settings > API 에서 확인
//   - Project URL       → SUPABASE_URL
//   - anon public key   → SUPABASE_ANON_KEY
// ============================================================

const SUPABASE_URL = "https://qqymbmhpdbyshsvolykg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxeW1ibWhwZGJ5c2hzdm9seWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NTU3ODUsImV4cCI6MjA5OTIzMTc4NX0.ZC2ixWVh99476Qgg7j8ylYewbcrvY39l5ln1Qb-sh0E";

// 서비스 소개용 정보 (자유롭게 수정)
const SERVICE_INFO = {
  name: "웨딩홀 시식 예약",
  hero: "결혼식 전, 두 분만을 위한 시식 자리",
  subtitle: "주말 예식 전 시식 일정을 안내하고, 편하게 예약 문의를 남겨보세요.",
  cards: [
    { icon: "🍽️", title: "무엇을", desc: "실제 예식 당일 제공되는 코스를 신랑·신부가 미리 맛봅니다." },
    { icon: "💳", title: "얼마에", desc: "2인 기준 무료 (예식 계약 고객), 일반 시식 1인 30,000원" },
    { icon: "📍", title: "어디서", desc: "서울시 강남구 웨딩홀 3층 다이닝 · 주차 2시간 무료" },
  ],
};

// Supabase 클라이언트 생성 (전역)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
