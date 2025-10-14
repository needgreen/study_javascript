/* 

- 각 카드 내 보여지는 목록 
    - 썸네일 (이미지)  `thumbnailUrl`
    - 카테고리명  `course-card__category`
    - 강의 제목   `course-card__title`
    - 강사명  `course-card__instructor`
    - 평점  `course-card__rating-icon`
    - 리뷰 갯수  `course-card__rating-count`
    - 수강 인원 수 `studentCount`  
- 마우스 오버(hover) 시 보이지는 목록
    - 강의 제목
    - 한줄 요약
    - 난이도 , 태그 `([category[category.length-1], level])`
    - ‘자세히보기’  버튼
- 자세히보기 버튼 클릭 시 > 상세 페이지(details/#) 로 이동

*/

import { courseList } from "./mockData.js";
import { store } from "./store.js";

function Courses() {
  const courseGrid = document.querySelector(".course-grid");

  // const testJsonData = JSON.stringify(courseList);
  // localStorage.setItem("courseList", testJsonData);
  // console.log(localStorage.getItem("courseList"));
  // const courseLIst = localStorage.getItem('course')

  courseList.forEach((cardItem) => {
    const courseCard = `
    <article class="course-card">
      <div class="course-card__media">
        <img class="course-card__media-image" src="${
          cardItem.thumbnailUrl
        }" alt="course-thumbnail" loading="lazy">
      </div>
      <div class="course-card__content">
        <p class="course-card__category">${cardItem.category}</p>
        <h2 class="course-card__title">${cardItem.title}</h2>
        <p class="course-card__instructor">${cardItem.instructor}</p>
        <div class="course-card__info-row">
          <div class="course-card__stats">
            <span class="course-card__rating">
              <span class="course-card__rating-icon">★</span>${cardItem.rating}
              <span class="course-card__rating-count">(${
                cardItem.reviews.length
              })
              </span>
            </span>
            <span class="course-card__students">👥 ${
              cardItem.studentCount
            }</span>
          </div>
        </div>
      </div>  
       <!-- 강의 상세 오버레이 -->
      <div class="course-card__hover-panel">
        <div class="course-detail">
          <div class="course-detail__header">
            <h3 class="course-detail__title"> ${cardItem.title} </h3>
          </div>
          <p class="course-detail__description">
          ${cardItem.description}              
          </p>
          <div class="course-tags">
            <ul> ${cardItem.tags
              .map((tag) => `<li id="course-tag">${tag}</li>`)
              .join("")}
            </ul>
          </div>
          <div class="course-detail__actions">
             <a href="details/${
               cardItem.id
             }" class="course-detail__cta">자세히 보기 </a>
          </div>
        </div>
      </div>
    </article>
  `;
    courseGrid.insertAdjacentHTML("beforeend", courseCard);
  });
}

const courses = new Courses();
