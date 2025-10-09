//fetch("요청할 자원의 주소").then(()=>{} //콜백함수)
fetch("./../layout/header.html")
  .then((response) => response.text())
  .then((responseText) => {
    document
      .querySelector(".container")
      .insertAdjacentHTML("afterbegin", responseText);
  });
