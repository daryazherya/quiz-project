let answers = { };


// Перемещение вперед

let btnNext = document.querySelectorAll('[data-nav= "next"]');
btnNext.forEach(function(button) {
    button.addEventListener('click', function(){
       let thisCard = this.closest('[data-card]');
       let thisCardNum = parseInt(thisCard.dataset.card);

       if(thisCard.dataset.validate == "novalidate") {
                console.log('Novalidate');
                navigate('next',thisCard);
                upDateProgressBar ("next",thisCardNum) 

            } else {
                console.log('validate'); 
            takeDataCards(thisCardNum, gatherCardData(thisCardNum));
            upDateProgressBar ("next",thisCardNum);


            if(isFilled(thisCardNum) && checkOnRequired(thisCardNum)) {
                navigate('next',thisCard);
            } else {
                alert('Выберите ответ в карточке')
            } 
        }
        
             
    })
});

        // Перемещение назад

let btnPrev = document.querySelectorAll('[data-nav= "prev"]');
    btnPrev.forEach(function (button){
        button.addEventListener('click',function() {
           let thisCard = this.closest('[data-card]');
           let thisCardNum = parseInt(thisCard.dataset.card);
           navigate('prev',thisCard);
           upDateProgressBar ("prev",thisCardNum) 

           
        })
    });

    // Подсветка рамки у радиокнопок

let radioGroup = document.querySelectorAll('.radio-group').forEach(function(item){
    item.addEventListener('click',function (e) {

        let label = e.target.closest('label');
        // Отмена активного класса у всех тегов label

        if(label) {
            label.closest('.radio-group').querySelectorAll('label').forEach(function(item) {
                item.classList.remove('radio-block--active')
            })
            label.classList.add('radio-block--active');
        }

    })

});

// Подсветка рамки для чекбоксов

let checkboxGroup = document.querySelectorAll('label.checkbox-block input[type="checkbox"]').forEach(function(item){
    item.addEventListener('change',function () {
        // 
        if(item.checked) {
            item.closest('label').classList.add('checkbox-block--active');
            } else {
                item.closest('label').classList.remove('checkbox-block--active')
            }
            
        })

    })



function navigate(direction, thisCard) {
    let nextCard;
    let thisCardNum = parseInt(thisCard.dataset.card);
    if (direction == 'next') {  
        nextCard = thisCardNum + 1;
    } else {
         nextCard = thisCardNum - 1;
    }

    thisCard.classList.add('hidden');
    document.querySelector(`[data-card= "${nextCard}"]`).classList.remove('hidden');
};


function gatherCardData(number) {
    let question;
    let result = [];
    let currentCard = document.querySelector(`[data-card="${number}"]`);
    question = currentCard.querySelector('[data-question]').innerText;
    
    let radioValues = currentCard.querySelectorAll('[type="radio"]');
     radioValues.forEach(function(item) {
            if(item.checked) { 
                result.push({
                    name: item.name,
                    value: item.value
             })
        } 
        
    })

    let checkboxValues = currentCard.querySelectorAll('[type="checkbox"]');
         checkboxValues.forEach(function(item){
            
            if(item.checked) {
            result.push({
                name: item.name,
                value: item.value
            })
        } 
    })

    let inputValues = currentCard.querySelectorAll('[type="email"],[type="text"],[type="number"]');
        inputValues.forEach(function(item){
            itemValue = item.value
            if(itemValue.trim() != "") {
                result.push({
                    name: item.name,
                    value: item.value
                })
            }
        })

    let data = {
        question: question,
        answer: result
    }

    return data;

};

function takeDataCards(num, data) {
       return answers[num] = data;

};

function isFilled(num) {
    if(answers[num].answer.length > 0) {
        return true
    } else {
        return false
    }
};

function validateEmail(email) {
     let pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
     return pattern.test(email);
};

function checkOnRequired(num) {
    let currentCard = document.querySelector(`[data-card="${num}"]`);
      let requiredFields =  currentCard.querySelectorAll('[required]');
      let isValidArray = [];

      requiredFields.forEach(function(item) {
        if(item.type == "checkbox" && item.checked == false){
            isValidArray.push(false);
        } else if (item.type == "email") {
            if(validateEmail(item.value)) {
                isValidArray.push(true);
            }  else {
            isValidArray.push(false);
        } 
            console.log(isValidArray)
      }
    })
 
    if(isValidArray.indexOf(false) ==-1 ) {
        return true
    } else {
        return false
    }

};

function upDateProgressBar (direction,cardNum) {
    let allCard = document.querySelectorAll('[data-card]').length;
    let progress;
    // Проверка перемещения

    if(direction == "next") {
        cardNum += 1 ;
    } else {
        cardNum -= 1 ;
        
    }
// Рассчет процента прохождения теста

progress = ((cardNum * 100)/allCard).toFixed();

 let progressBar = document.querySelector(`[data-card = "${cardNum}"]`).querySelector(".progress") ;
 if(progressBar) {
    progressBar.querySelector('.progress__label strong').innerText = `${progress}%`;
    progressBar.querySelector('.progress__line-bar').style = `width: ${progress}%`;
 }
 
}

