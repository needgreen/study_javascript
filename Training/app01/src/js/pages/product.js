/* 
  1. 도서 추가 
   - 도서명과 가격을 입력 후 "확인" 버튼 클릭 또는 엔터키 입력 시 도서를 추가한다.
    (예외상황) 단, 입력값이 누락되었을 경우 추가되지 않는다. 
   - 도서 추가가 완료되면 입력 필드는 초기화한다.
   - 추가된 도서정보는 리스트 하단에 표현되어야한다.

  2. 도서 수정
   - 도서 정보의 "수정" 버튼 클릭시 모달 창을 통해 도서명과 가격을 수정할 수 있다.
   - 모달 창이 열리면 수정할 도서의 기존 도서명과 가격이 미리 입력되어있다.

  3. 도서 삭제
   - 도서 정보의 "삭제" 버튼 클릭시 브라우저에 제공되는 confirm 인터페이스로 사용자의 삭제 의사를 확인한 뒤 삭제를 진행한다.
   - 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.
*/

const $ = (selector) => document.querySelector(selector);

function Product() {
  // 재사용 함수 - 도서 캣수 카운팅(자손 갯수 출력)
  const updateBookCount = () => {
    $("#book-count").innerText = $("#book-list").children.length;
  };

  // 기능 함수 1 - 도서 추가
  const registBook = () => {
    const bookName = $("#book-name-input").value;
    const bookPrice = Number($("#book-price-input").value);

    if (!bookName.trim() || !bookPrice) {
      // bookName 또는 bookPrice 누락되었을 경우 + 공백 포함 메소드(.trim())
      alert("입력값이 누락되었습니다. 값을 입력해주세요.");
      return;
    }

    const bookItem = `
      <li class="book-item">
        <div class="book-info">
          <span class="book-name">${bookName} </span>
          <span class="book-price">₩${bookPrice.toLocaleString()}</span>
        </div>
        <div class="book-actions">
          <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
          <button class="delete-btn">삭제</button>
        </div>
      </li>         
    `;
    $("#book-list").insertAdjacentHTML("beforeend", bookItem); // 자손으로 추가

    $("#book-regist-form").reset(); //입력 폼 초기화
    $("#book-name-input").focus(); //첫번째 인풋 요소에 포커싱

    updateBookCount();
  };

  // 기능 함수 2.1 - 도서 수정 (modal)
  const editBookForm = (e) => {
    const $bookItem = e.target.closest(".book-item");

    const bookName = $bookItem.querySelector(".book-name").innerText;
    const bookPrice = Number(
      $bookItem.querySelector(".book-price").innerText.replace(/[₩,]/g, "")
    );
    //indexOf >> NodeList를 array 객체로 변환 필요
    const bookIndex = Array.from($("#book-list").children).indexOf($bookItem);

    $("#edit-book-name").value = bookName;
    $("#edit-book-price").value = bookPrice;
    $("#edit-book-index").value = bookIndex;
  };
  // 기능 함수 2.2 - 도서 수정 요청
  const editBook = () => {
    const editBookName = $("#edit-book-name").value;
    const editBookPrice = Number($("#edit-book-price").value);
    const editBookIndex = $("#edit-book-index").value;

    const $bookItem = $("#book-list").children[editBookIndex];
    $bookItem.querySelector(".book-name").innerText = editBookName;
    $bookItem.querySelector(
      ".book-price"
    ).innerText = `₩${editBookPrice.toLocaleString()}`;

    // 모달창 닫기
    $("#editModal .modal-close").click();
  };

  // 기능 함수 3 - 도서 삭제
  const deleteBook = (e) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      // 가장 가까운 상위 요소 탐색, 도서 제거
      e.target.closest(".book-item").remove();
      // 총 도서의 갯수 카운팅 출력
      updateBookCount();
    }
  };

  // 이벤트 핸들러
  // 도서 추가
  $("#book-regist-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    //      console.log(document.querySelector("#book-name-input").value);
    //      console.log(document.querySelector("#book-price-input").value);
    registBook();
  });

  // 도서 수정 & 삭제
  $("#book-list").addEventListener("click", (e) => {
    // 수정 버튼 클릭 (.closest >> 가장 가까운 상위 요소 탐색)
    if (e.target.classList.contains("edit-btn")) {
      editBookForm(e);
    }

    // 삭제 버튼 클릭 시 - 도서 삭제
    if (e.target.classList.contains("delete-btn")) {
      deleteBook(e);
    }
  });

  // 모달창에서 수정 요청
  $("#book-edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    editBook();
  });
}

const product = new Product();
