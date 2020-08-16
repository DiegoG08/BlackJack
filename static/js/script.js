// Challenge 1: Your Age in Days 


ageInDays=()=> {
    var birthYear =prompt('What year were you born?'); 
    var ageInDays = (birthYear-2020)*365; 
    var h1 = document.createElement('h1'); 
    var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

reset=()=> {
    document.getElementById('ageInDays').remove();
}

generateCat=()=>{
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src ="http://thecatapi.com/api/images/get?format=src&type=gif&size-tiny";
    div.appendChild(image);

}