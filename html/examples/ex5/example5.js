// Функція для генерації масиву псевдовипадкових чисел заданого розміру
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

// Функція для знаходження найменшого спільного елемента в двох масивах
function findSmallestCommonElement(array1, array2) {
    let commonElements = array1.filter(value => array2.includes(value));
    
    if (commonElements.length === 0) {
        return null; // Якщо немає спільних елементів
    }

    return Math.min(...commonElements);
}

// Функція для сортування масиву методом бульбашки в порядку зростання
function bubbleSort(array) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Обмін елементів
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

// Генерація двох масивів та пошук найменшого спільного елемента
document.getElementById('generateArrays').addEventListener('click', function() {
    let size1 = parseInt(document.getElementById('arraySize1').value);
    let size2 = parseInt(document.getElementById('arraySize2').value);

    let array1 = generateRandomArray(size1);
    let array2 = generateRandomArray(size2);

    document.getElementById('array1').textContent = 'Array 1: ' + array1.join(', ');
    document.getElementById('array2').textContent = 'Array 2: ' + array2.join(', ');

    let smallestCommonElement = findSmallestCommonElement(array1, array2);

    if (smallestCommonElement !== null) {
        document.getElementById('commonElement').textContent = 'Smallest common element: ' + smallestCommonElement;
    } else {
        document.getElementById('commonElement').textContent = 'No common elements found.';
    }
});

// Сортування масиву методом бульбашки
document.getElementById('sortArray').addEventListener('click', function() {
    let size = parseInt(document.getElementById('arraySize').value);
    let unsortedArray = generateRandomArray(size);

    document.getElementById('unsortedArray').textContent = 'Unsorted array: ' + unsortedArray.join(', ');

    let sortedArray = bubbleSort(unsortedArray);

    document.getElementById('sortedArray').textContent = 'Sorted array in ascending order: ' + sortedArray.join(', ');
});

class AlarmClock {
    constructor() {
      this.alarmTime = null;
      this.isAlarmOn = false;
    }
  
    setAlarm(time) {
      this.alarmTime = time;
      console.log(`Будильник встановлено на ${time}`);
    }
  
    turnOnAlarm() {
      this.isAlarmOn = true;
      console.log("Будильник увімкнено");
    }
  
    turnOffAlarm() {
      this.isAlarmOn = false;
      console.log("Будильник вимкнено");
    }
  
    checkAlarm() {
      if (this.isAlarmOn && this.alarmTime) {
        const now = new Date();
        const alarm = new Date(this.alarmTime);
        if (now.getHours() === alarm.getHours() && now.getMinutes() === alarm.getMinutes()) {
          console.log("Час для будильника! Пора прокидатися!");
        }
      }
    }
  }
  
  const myAlarm = new AlarmClock();
  myAlarm.setAlarm("08:00");
  myAlarm.turnOnAlarm();
  
  setInterval(() => {
    myAlarm.checkAlarm();
  }, 60000); // кожну хвилину (60 * 1000 мс)
  

