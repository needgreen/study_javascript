var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); // 80

console.log("==================");

var fruit = "사과";

function outer() {
  var fruit = "바나나";
  inner(); // inner를 여기서 호출했지만...
}

function inner() {
  console.log(fruit); // 뭐가 나올까?
}

outer(); // "사과" 출력
inner(); // "사과" 출력

console.log("==================");

// 좋은 예
function calculate() {
  let x = 10;
  let y = 20;
  let result = x + y;
  return result;
}
console.log(calculate);

console.log("==================");

var password = (function () {
  var secret = "1234"; // 비밀번호는 숨김

  return {
    check: function (input) {
      if (input === secret) {
        return "비밀번호 맞음!";
      } else {
        return "비밀번호 틀림!";
      }
    },
    change: function (oldPw, newPw) {
      if (oldPw === secret) {
        secret = newPw;
        return "비밀번호 변경 완료!";
      } else {
        return "기존 비밀번호가 틀렸습니다!";
      }
    },
  };
})();

// 사용하기
console.log(password.secret); // undefined - 직접 볼 수 없음
console.log(password.check("1234")); // "비밀번호 맞음!"
console.log(password.check("5678")); // "비밀번호 틀림!"
console.log(password.change("1234", "9999")); // "비밀번호 변경 완료!"
console.log(password.check("9999")); // "비밀번호 맞음!"

console.log("==================");

// 함수 안에서 지역 변수 사용
function sum(scores) {
  var total = 0; // 지역 변수
  var count = scores.length;

  for (var i = 0; i < count; i++) {
    total += scores[i];
  }

  var age = total / count;
  return age;
}


console.log(score);
