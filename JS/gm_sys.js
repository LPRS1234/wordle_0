//전체 게임 화면
const gm_sc = document.getElementById('gm_sc')

// 랜덤 정답 선택
let answer = answers[Math.floor(Math.random() * answers.length)];

let currentRowIndex = 0;

const sub_btn = document.getElementById('submit_btn');
const rows = document.querySelectorAll('.input-row');
let gameEnded = false;

function SubmitAnswer() {
    const currentRow = rows[currentRowIndex];
    const inputs = currentRow.querySelectorAll('.input');

    if (gameEnded) {
      return;
    };

    // 입력이 다 되었는지 검사
    for (let i = 0; i < 4; i++) {
        if (inputs[i].value === "") {
            alert("모든 글자를 입력해주세요.");
            return;
        }
    }

    // 정답 체크
    for (let i = 0; i < 4; i++) {
        const char = inputs[i].value;
        const correct = answer[i]; //실제 랜덤으로 뽑힌 정답


        if (char === correct) {
            inputs[i].style.background = '#79B851';
        } else if (answer.includes(char)) {
            inputs[i].style.background = '#F3C237';
        } else {
            inputs[i].style.background = '#A4AEC4';
        }

        // 정답 제출 후 입력 비활성화
        inputs[i].disabled = true;
    }

    function ResetGame() {
      //게임 상태 초기화
      gameEnded = false;
      //새로운 정답뽑고 힌트 수정
      const newAnswer = answers[Math.floor(Math.random() * answers.length)];
      answer = newAnswer;
      document.getElementById("hint").innerText = hints[newAnswer];
      
      //입력 줄 초기화
      currentRowIndex = 0;
      rows.forEach((row, rowIndex) => {
        const inputs = row.querySelectorAll('.input');
        inputs.forEach(input => {
          input.value = ''
          input.disabled = rowIndex !== 0; //첫 줄만 초기화
          input.style.background = "white"; //배경색 초기화
        })
      })
      console.log(answer);
      rows[0].querySelectorAll('.input')[0].focus();

    };

    
    function createElement() {
        const h1 = document.createElement("h1");
        h1.innerText = `정답 : ${answer} \n 뜻 : ${hints[answer]} \n ${examples[answer]}`;
        document.body.appendChild(h1);
        h1.classList.add("last")
        //console.dir(h1)
    };

    function createNextBtn() {
      const btn = document.createElement("button");
      btn.innerText = "다음 문제";
      btn.classList.add("next-btn")
      btn.classList.add("last")
      btn.id = "nextBtn"
      document.body.appendChild(btn);

      btn.addEventListener("click", () => {
        gm_sc.style.display = '';
        const allLasts = document.querySelectorAll(".last");
        allLasts.forEach(el => el.remove());
        ResetGame() 
      });  

      console.dir(btn);
    }

    // 정답일 경우 게임 종료
    const guess = [...inputs].map(i => i.value).join('');
    if (guess === answer) {
        gameEnded = true;
        gm_sc.style.display = 'none'
        createElement()
        createNextBtn()
    }

    // 다음 줄로 이동
    currentRowIndex++;
    if (currentRowIndex < rows.length) {
        const nextInputs = rows[currentRowIndex].querySelectorAll('.input');
        nextInputs.forEach(i => i.disabled = false);
        nextInputs[0].focus();
    } else {
        alert("모든 기회를 사용했습니다. 정답: " + answer);
    }
}


const allInputs = document.querySelectorAll('.input');

allInputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const prevInput = allInputs[index - 1];
      if (prevInput && !prevInput.disabled) {
        prevInput.focus();
      }
    } else if (e.key === 'ArrowRight') {
      const nextInput = allInputs[index + 1];
      if (nextInput && !nextInput.disabled) {
        nextInput.focus();
      }
    }

    if (e.key === 'Backspace' && input.value === '') {
      const prevInput = allInputs[index - 1];
      if (prevInput && !prevInput.disabled) {
        prevInput.focus();
      }
    }
  });
});



document.getElementById('hint').innerText = hints[answer];
console.log(answer);

sub_btn.addEventListener('click', SubmitAnswer);
document.addEventListener('keypress', function(event) {
    const user_key = event.key
    if(user_key === 'Enter' && !gameEnded) {
        SubmitAnswer()
    }
})

console.dir(sub_btn);