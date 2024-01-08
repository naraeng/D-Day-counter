const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");
const intervalIdArr = [];

// container.computedStyleMap.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;
  // 템플릿 리터럴
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  return dateFormat;
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-data", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  // 만약 remaining이 0이면, "타이머가 종료되었습니다." 출력
  if (remaining <= 0) {
    console.lod("타이머가 종료되었습니다.");
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    // 만약 잘못된 날짜가 들어왔다면, "유효한 시간대가 아닙니다." 출력
    console.log("유효한 시간대가 아닙니다.");
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  //   const remainingDate = Math.floor(remaining / 3600 / 24);
  //   const remainingHours = Math.floor(remaining / 3600) % 24;
  //   const remainingMin = Math.floor(remaining / 60) % 60;
  //   const remainingSec = Math.floor(remaining % 60);

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining % 60),
  };

  //   const days = document.getElementById("days");
  //   const hours = document.querySelector("#hours");
  //   const min = document.querySelector("#min");
  //   const sec = document.querySelector("#sec");

  //   const documentObj = {
  //     days: document.getElementById("days"),
  //     hours: document.querySelector("#hours"),
  //     min: document.querySelector("#min"),
  //     sec: document.querySelector("#sec")
  //   };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);
  // const docKeys = Object.keys(documentObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };
  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
  //   for (let i=0; i<timeKeys.length; i++) {
  //     documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  //   }

  //   let i = 0;
  //   for (let key in documentObj) {
  //     documentObj[key].textContent = remainingObj[timeKeys[i]];
  //     i++;
  //   }

  //   documentObj['days'].textContent = remainingObj['remainingDate'];
  //   documentObj['hours'].textContent = remainingObj['remainingHours'];
  //   documentObj['min'].textContent = remainingObj['remainingMin'];
  //   documentObj['sec'].textContent = remainingObj['remainingSec'];
};

const starter = function (targetDateInput) {
  // undefined인 경우
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  localStorage.setItem("saved-date", targetDateInput);
  localStorage.getItem("saved-date");
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  // 인자가 있는 경우, 화살표 익명 함수로
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
}
