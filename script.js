const menuBtn = document.querySelector('#menu');
const removeBtn = document.querySelector('#remove');

menuBtn.addEventListener('click', () => {
    menuBtn.style.display= 'none';
    removeBtn.style.display = 'inline-block';
    document.querySelector('header article').style.display = 'block';

})
document.querySelector('aside').addEventListener('click', ()=>{
    
    menuBtn.style.display = 'inline-block';
    removeBtn.style.display = 'none';
    document.querySelector('header article').style.display = 'none'
})
function removeMenu () {
    removeBtn.style.display= 'none';
    menuBtn.style.display = 'inline-block';
    document.querySelector('header article').style.display = 'none'
}
removeBtn.addEventListener('click',removeMenu);

// code for example 

const title = document.querySelector('aside .example h2');
const img = document.querySelector('aside .example img');
const paragraph = document.querySelector('aside .example p');


const selectAllFood = () =>{
    const foods = document.querySelectorAll('nav div');

    foods.forEach((element) =>{
        element.style.cursor ='pointer'
        element.addEventListener('click', () =>{
            const paragraphTitle = element.lastChild.innerHTML;
            inputNewFood(paragraphTitle)
            
        })
    })
}

let apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c'
const exampleDisplayer = () =>{
    fetch(apiUrl)
    .then(response => {return response.json()})
    //.then(data => {console.log (data.meals[i])})
    .then(json => {
        
        title.innerHTML = `${json.meals[1].strMeal}`;
        img.src = `${json.meals[1].strMealThumb}`;
        paragraph.innerHTML = `${ json.meals[1].strInstructions}`
    
        
    })
}

exampleDisplayer();

//code for nav

const nav = document.querySelector('nav nav');

const foodDisplayer = () =>{
    for(let i=0; i<10; i++){
        const newDiv = document.createElement('div');
        fetch(apiUrl)
        .then(response => {return response.json()})
        .then(json => {
            newDiv.innerHTML = `<img src="${json.meals[i].strMealThumb}" alt="">
            <hr><p class="cooking">${json.meals[i].strMeal} </p>`;        
            nav.appendChild(newDiv);
        })
        .then(() => {
            selectAllFood()
        })
          
    }
    
}

foodDisplayer();

//slide script
const removeAngle = () =>{
    if(move < -47.88){
        angleRight.style.display ='none'
    }else if(move <= 0 && move >= -3.559 ){
        angleLeft.style.display = 'none'
    }else{
        angleLeft.style.display = 'inline-block';
        angleRight.style.display = 'inline-block';
    }
}

const angleLeft = document.querySelector('.angle i:first-child');
const angleRight = document.querySelector('.angle i:last-child');
let move = 0;
angleLeft.addEventListener('click', () =>{
    move += 7.98;
    nav.style.transform = `translateX(${move}rem)`;
    removeAngle()
    console.log(move)
    
})
angleRight.addEventListener('click', () =>{
    move -= 7.98;
    nav.style.transform = `translateX(${move}rem)`
    removeAngle()
    console.log(move)

})

// End slice

// Display food logic when clicked to a food or on search

const inputNewFood = (name) =>{
    const newUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(newUrl).then(response => {return response.json()})
    .then (data => {
        title.innerHTML = `${data.meals[0].strMeal}`;
        img.src = `${data.meals[0].strMealThumb}`;
        paragraph.innerHTML = `${ data.meals[0].strInstructions}`
    } )
}


document.querySelector('form').addEventListener('submit' , (e) =>{
    e.preventDefault()
    inputNewFood(`${document.querySelector('input').value}`)
})
document.querySelector('header span .fa-magnifying-glass').addEventListener('click', (e) =>{
    e.preventDefault()
    inputNewFood(`${document.querySelector('input').value}`)
})

//all food 

const allFood = document.querySelector('main main');

const allFoodDisplay = () =>{
    for(let i=0; i<10; i++){
        const newDiv = document.createElement('div');
        fetch(apiUrl)
        .then(response => {return response.json()})
        .then(json => {
            newDiv.innerHTML = `<img src="${json.meals[i].strMealThumb}" alt="">
            <hr><p class="cooking">${json.meals[i].strMeal} </p>`;        
            allFood.appendChild(newDiv);
        })
        .then(() => {
            selectAllFood()
            const food = document.querySelectorAll('main main div');
            food.forEach(element => {
                element.addEventListener('click', () =>{
                    
                    const paragraphTitleF = element.lastChild.innerHTML;
                    inputNewFood(paragraphTitleF);
                    hideAllFood();
                })
            })
        })
          
    }
    console.log(apiUrl)
    
}

allFoodDisplay();

const outPutAllFood = () =>{
    document.querySelector('main main').style.display = 'inline-block';
    document.querySelector('small').style.display = 'inline-block';
}

const hideAllFood = () =>{
    document.querySelector('main main').style.display = 'none';
    document.querySelector('small').style.display = 'none';   
}

document.querySelector('.view-all').addEventListener('click', outPutAllFood)
document.querySelector('small').addEventListener('click', hideAllFood);

// menu items script

document.querySelector('#view-all').addEventListener('click', () =>{
    outPutAllFood();
    removeMenu()
})

const changeImageAndExampleFood = (variable) =>{
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${variable}`;
    console.log(apiUrl)
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        const el1 = document.querySelectorAll('aside nav nav div img');
        const el2 = document.querySelectorAll('aside nav nav div p');
        const el3 = document.querySelectorAll('main main div img');
        const el4 = document.querySelectorAll('main main div p');
        el1.forEach((element, index) => {
            if(data.meals[index].strMealThumb){
                element.src = `${data.meals[index].strMealThumb}`
            }
            
        })
        el2.forEach((element, index) => {
            if(data.meals[index].strMeal){
                element.innerHTML = `${ data.meals[index].strMeal}`
                
            }
            
        })
        el3.forEach((element, index) => {
            if(data.meals[index].strMealThumb){
                element.src = `${data.meals[index].strMealThumb}`
            }
            
        })
        el4.forEach((element, index) => {
            if(data.meals[index].strMeal){
                element.innerHTML = `${ data.meals[index].strMeal}`
                
            }
            
        })
        title.innerHTML = `${data.meals[1].strMeal}`;
        img.src = `${data.meals[1].strMealThumb}`;
        let id = data.meals[1].idMeal;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(newData => {
            paragraph.innerHTML = `${ newData.meals[0].strInstructions}`
        })
        
    })
}
document.querySelector('.canadian_food').addEventListener('click', () =>{
    removeMenu()
    changeImageAndExampleFood('canadian')
})
document.querySelector('.french_food').addEventListener('click', () =>{
    removeMenu()
    changeImageAndExampleFood('french')
})
document.querySelector('.home').addEventListener('click', () =>{
    removeMenu()
    hideAllFood()
    
})

// listen to remove menu items while input the food's name
document.querySelector('header input').addEventListener('click' , removeMenu)




