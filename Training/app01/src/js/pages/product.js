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

  4. 도서 데이터 저장 & 카테고리별 도서 관리 기능 추가
   - localStorage를 활용하여 변경되는 데이터를 실시간으로 저장하고, 새로고침 시에도 데이터가 유지될 수 있도록 한다.
   - 도서의 카테고리별로 따로 도서 데이터를 관리 할 수 있도록 한다.
   - 상품 관리 페이지 최초 접근 시 “IT” 카테고리 도서 관리가 먼저 보이도록 한다.

*/

const $ = (selector) => document.querySelector(selector);

// 저장소 객체(메소드) 정의
const store = {
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};

function Product() {
  // Product 내에서(this 사용) 상태(변하는 데이터) - 도서 정보
  // 도서 상태 관리 변수 : 기록하는 용도, 배열[] 형태로 설정
  this.books = {};

  // 카테고리 상태 관리 변수 // 객체{} 형태로 관리
  this.currentCategory = {};

  // 📌 초기화를 위한 메소드 - 최초 1회만 호출
  this.init = () => {
    // 카테고리 상태 초기화
    this.currentCategory = {
      code: "it",
      name: "IT",
    };
    renderCategory();

    // 도서 상태 초기화
    this.books = store.getLocalStorage("books") || {
      // || [] : books 라는 데이터가 없다면 빈배열[]로 출력
      // 카테고리에 맞는 데이터 기록 (배열에서 객체로 변경) => category code 값을 같이 기록하는 방식
      // {it:[{title: "xxx", price:xx}], science:[{title: "xxx", price:xx}], ...}
      it: [],
      science: [],
      literature: [],
      history: [],
    };
    if (this.books.length !== 0) renderBook();
  };

  // 💡 재사용 함수 - 도서 갯수 카운팅(자손 갯수 출력)
  const updateBookCount = () => {
    $("#book-count").innerText = $("#book-list").children.length;
  };

  // 💡 재사용 함수 - 도서 정보 렌더링
  // this.books에 담긴 도서들을 li요소로 만들어 한번에 출력
  // 순회하면서 li요소로 변환 => 배열을 하나의 문자열로 만들어 저장 (join 메소드 사용)
  const renderBook = () => {
    const bookItems = this.books
      .map((book) => {
        return `
          <li class="book-item">
            <div class="book-info">
              <span class="book-name">${book.title} </span>
              <span class="book-price">₩${book.price.toLocaleString()}</span>
            </div>
            <div class="book-actions">
              <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
              <button class="delete-btn">삭제</button>
            </div>
          </li>         
        `;
      })
      .join("");
    $("#book-list").innerHTML = bookItems;
    updateBookCount(); // 총 도서의 갯수 카운팅 출력 리렌더링
  };

  // 💡 재사용 함수 - 카테고리 정보 렌더링
  const renderCategory = () => {
    $("#book-category-name").innerText = this.currentCategory.name;
    // 기존 버튼 액티브 효과 제거 + 현재 버튼에 액티브 효과 추가
    //e.target.classList.add("active"); // 직접 타겟 후 효과 적용
    // 전체 버튼 순회(forEach)한 후 액티브 효과 설정
    document.querySelectorAll(".category-btn").forEach((categoryBtn) => {
      categoryBtn.classList.toggle(
        "active",
        categoryBtn.dataset.categoryCode === this.currentCategory.code
      );
    });
  };

  // 기능 함수 1 - 도서 추가
  const registBook = () => {
    // 입력값 가져오기
    const bookName = $("#book-name-input").value;
    const bookPrice = Number($("#book-price-input").value);

    // 유효성 검사
    if (!bookName.trim() || !bookPrice) {
      // bookName 또는 bookPrice 누락되었을 경우 + 공백 포함 메소드(.trim())
      alert("입력값이 누락되었습니다. 값을 입력해주세요.");
      return;
    }

    // 1) 도서 상태 변경 - this.books == {it:[], science:[], ...}
    /* 
    this.books.push({
      title: bookName,
      price: bookPrice,
    });
    */
    // {it:[{title: "xxx", price:xx}], science:[{title: "xxx", price:xx}], ...}
    this.books[this.currentCategory.code].push({
      title: bookName,
      price: bookPrice,
    });
    // 2) 변경된 도서 상태 저장(기록)
    store.setLocalStorage("books", this.books);
    // 3) 변경된 상태에 맞춰 요소 렌더링
    renderBook();
    $("#book-regist-form").reset(); //입력 폼 초기화
    $("#book-name-input").focus(); //첫번째 인풋 요소에 포커싱

    /* 로컬스토리지에 저장하기 전 li 요소 생성 코드 내용 
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
    */
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

    // 1) 도서 상태 변경 (기존 도서 찾아서 수정)
    this.books[editBookIndex] = {
      title: editBookName,
      price: editBookPrice,
    };
    // 2) 변경된 상태 기록
    store.setLocalStorage("books", this.books);
    // 3) 변경된 상태 기반 요소 렌더링
    renderBook();
    /* 로컬 스토리지 기록 전 직접 대입한 수정 방식
    const $bookItem = $("#book-list").children[editBookIndex];
    $bookItem.querySelector(".book-name").innerText = editBookName;
    $bookItem.querySelector(
      ".book-price"
    ).innerText = `₩${editBookPrice.toLocaleString()}`;
    */

    // 모달창 닫기
    $("#editModal .modal-close").click();
  };

  // 기능 함수 3 - 도서 삭제
  const deleteBook = (e) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      // 1) 상태 변경 (삭제)
      const deleteBookIndex = Array.from($("#book-list").children).indexOf(
        e.target.closest(".book-item")
      );
      this.books.splice(deleteBookIndex, 1);
      // 2) 변경 상태 기록
      store.setLocalStorage("books", this.books);
      // 3) 변경된 상태 요소 렌더링
      renderBook();

      // 로컬 스토리지 기록 전 직접 탐색
      //  e.target.closest(".book-item").remove(); // 가장 가까운 상위 요소 탐색, 도서 제거
    }
  };

  // 이벤트 핸들러
  // 각 카테고리 버튼 클릭 > 타이틀명 + active 효과
  $(".category-select").addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
      // const currentCategoryCode = e.target.dataset.categoryCode;
      // const currentCategoryName = e.target.innerText;

      // 1) 카테고리 상태 변화
      this.currentCategory = {
        code: e.target.dataset.categoryCode,
        name: e.target.innerText,
      };

      // 2) 변경된 카테고리 상태 기반 렌더링
      renderCategory();
    }
  });

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
product.init(); // 초기화 시키기 호출
