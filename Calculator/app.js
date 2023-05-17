(function(){

    //declare variables
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equals = document.querySelector('.btn-equals');

    //for each button clicked
    buttons.forEach(function(button){
        //listen for click to trigger function
        button.addEventListener('click', function(e){
            //value of button attribute. e.g. 1 is clicked, dataset.num is 1
            let value = e.target.dataset.num;
            //display correct button pressed on 'screen'
            screen.value += value;
        })
    })

    //function for equals
    equals.addEventListener('click', function(e){
        // if screen is empty, show empty
        if(screen.value === ''){
            screen.value = "";
        }else{
            let answer = eval(screen.value);
            screen.value = answer;
        }
    })

    clear.addEventListener('click', function(e){
        screen.value = "";
    })

})();