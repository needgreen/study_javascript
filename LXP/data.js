// ========================================
// 1. 강좌 목록 데이터
// ========================================

const courseList = [
  {
    id: "course1",
    title: "JavaScript 기초부터 실전까지",
    description: "기본 문법부터 실전까지 배우는 자바스크립트",
    thumbnail: "../photo_01.jpg",
    instructor: {
      name: "김코딩",
    },
    category: "프로그래밍",
    level: "초급",
    price: 55000,
    discountPrice: 39000,
    rating: 4.8,
    reviewCount: 123,
    studentCount: 456,
    duration: 480, // 분 단위 (8시간)
    lectureCount: 24,
    tags: ["JavaScript", "프론트엔드", "웹개발"],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: "course2",
    title: "HTML/CSS 완벽 가이드",
    description: "웹페이지 제작의 기초, HTML과 CSS 학습",
    thumbnail: "../photo_02.jpg",
    instructor: {
      name: "박디자인",
    },
    category: "디자인",
    level: "초급",
    price: 0, // 무료 강의
    discountPrice: null,
    rating: 4.6,
    reviewCount: 22,
    studentCount: 12,
    duration: 360, // 분 단위
    lectureCount: 18,
    tags: ["HTML", "CSS", "반응형"],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: "course3",
    title: "React로 만드는 웹",
    description: "React를 활용한 완벽 정복",
    thumbnail: "../photo_03.jpg",
    instructor: {
      name: "윤프로",
    },
    category: "프로그래밍",
    level: "중급",
    price: 89000,
    discountPrice: 69000,
    rating: 4.9,
    reviewCount: 26,
    studentCount: 223,
    duration: 720, // 분 단위
    lectureCount: 36,
    tags: ["React", "JavaScript", "web"],
    isBestSeller: true,
    isNew: true,
  },
];

// ========================================
// 2. 필터/정렬 옵션
// ========================================

const filterOptions = {
  categories: ["전체", "프로그래밍", "디자인", "웹개발", "마케팅"],
  levels: ["전체", "초급", "중급", "고급"],
  prices: ["전체", "무료", "유료", "할인중"],
  sortOptions: [
    { value: "popular", label: "인기순" },
    { value: "recent", label: "최신순" },
    { value: "high_rating", label: "높은 평점순" },
    { value: "student_count", label: "수강인원순" },
  ],
};
