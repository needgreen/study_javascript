/**
 * 문제 1. 출력 결과와 같은 모양으로 별(*)을 출력하기 위해서 빈칸으로 처리된 for문 내부를 작성해보자.
 * 출력 결과에 집중하기보다는, 작성한 방법에 따라 어떤 순서, 흐름으로 출력되는 지 이해하는 것이 중요하다.
 *
 * 학습목표. 이중 반복문의 실행 흐름을 파악하고, for문을 적절히 사용할 수 있다.
 *
 *
 * Hint1. 빈공간을 표현해야할 때는 " "(공백출력)으로 처리한다.
 * Hint2. 공백을 출력하는 for문과 별(*)을 출력하는 for문을 나눠서 생각한다.
 * Hint3. 안쪽 반복문이 "가로 한 줄"을 출력한다고 생각한다.
 *
 * 문제 1-1.
 * 출력 결과 :  *****
 *              *****
 *              *****
 *              *****
 *              *****
 */

// 주석을 해제하고 빈칸을 채우세요!
 for (let i = 0; i < 5; i++) {    // 바깥 for문은 세로 5줄(행) 1씩 증가
 for (let j = 0; j < 5; j++) {    // 안쪽 for문은 가로 5개(열) 1씩 증가
     process.stdout.write("*");
   }
   process.stdout.write("\n");
 }

 /* 
중첩 for문에서는 보통 다음 순서로 씀: 개발자간의 변수 사용 관습
첫 번째 반복 변수: i
두 번째 반복 변수: j
세 번째 반복 변수: k 
*/



/**
 * 문제 1-2.
 * 출력 결과 :  *
 *              **
 *              ***
 *              ****
 *              *****
 */

// 주석을 해제하고 빈칸을 채우세요!
 for (let i = 0; i < 5; i++) {
 for (let j = 0; j <= i; j++) {  // j가 i보다 작거나 같을 때 반복, j는 1씩 증가
     process.stdout.write("*");
   }
   process.stdout.write("\n");
 }



/**
 * 문제 1-3.
 * 출력 결과 :      *
 *                 **
 *                ***
 *               ****
 *              *****
 */

// 주석을 해제하고 빈칸을 채우세요!
 for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5 - i - 1; j++) { // i 값에 따라 공백 갯수, i = 0 일 때 j < 4 공백 4칸
     process.stdout.write(" "); // 공백
   }
   for (let k = 0; k <= i; k++)  { // 별 
     process.stdout.write("*");
   }
   
   process.stdout.write("\n");
  }





/**
 * 문제 1-4.
 * 출력 결과 :      *
 *                 ***
 *                *****
 *               *******
 *              *********
 */

// 주석을 해제하고 빈칸을 채우세요!
 for (let i = 0; i < 5; i++) {
   for (let j = 0; j < 5 - i - 1; j++) { // 내려가면서 공백 만들기
     process.stdout.write(" ");
   }
   for (let k = 0; k < 2 * i + 1; k++) {
     process.stdout.write("*");
   }
   process.stdout.write("\n");
 }








 
/** 문제 정답
 * 아래로 스크롤해서 보세요!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * !! 같은 출력이라도 다르게 코드를 짤 수 있습니다 !!
 * !! 밑의 정답은 하나의 정답 예시로 봐주시면 감사하겠습니다.!!
 *
 *
 * 문제 1-1 정답
 *
 * for (let i = 0; i < 5; i++) {
 *    for (let j = 0; j < 5; j++) {
 *        process.stdout.write("*");
 *    }
 *    process.stdout.write("\n");
 * }
 *
 *
 * 문제 1-2 정답
 *
 * for (let i = 0; i < 5; i++) {
 *    for (let j = 0; j <= i; j++) {
 *        process.stdout.write("*");
 *    }
 *    process.stdout.write("\n");
 * }
 *
 *
 *
 * 문제 1-3 정답
 *
 * for (let i = 0; i < 5; i++) {
 *    for (let j = 0; j < 5 - (i + 1); j++) {
 *        process.stdout.write(" ");
 *    }
 *    for (let k = 0; k <= i; k++) {
 *        process.stdout.write("*");
 *    }
 *    process.stdout.write("\n");
 * }
 *
 *
 * 문제 1-4 정답
 *
 * for (let i = 0; i < 5; i++) {
 *    for (let j = 0; j < 5 - (i + 1); j++) {
 *        process.stdout.write(" ");
 *    }
 *    for (let k = 0; k <= 2 * i; k++) {
 *        process.stdout.write("*");
 *    }
 *    process.stdout.write("\n");
 * }
 *
 * */