'use strict';

// Animal Array
let animalArray = [];
// create array of keywords
let keywords = [];

let AnimalObj = function(filePath, title, descript, keyword, horns) {
  this.filePath = filePath;
  this.title = title;
  this.descript = descript;
  this.keyword = keyword;
  this.horns = horns;
  animalArray.push(this);
};

// Load data from JSON, instance objects, and populate HTML
const pageLoad = (dataFile) =>{
  
  $.get(dataFile, data => {
    //to save the previous template
    let section = $('#photo-template').clone();
    //deleting the rendered values and creating fresh template
    $('main').empty().append(section);
    data.forEach(ele => {
      new AnimalObj(ele.image_url, ele.title, ele.description, ele.keyword, ele.horns);
      makeAnimalSection(ele);
    });
    makeAnimalKeywords(animalArray);
    appendKeywordOptions(keywords);
    select();
  });
};

// create clone of animal section
let makeAnimalSection = (ele) => {
  const section = $('#photo-template').clone();
  section.children('h2').append(ele.title);
  section.children('img').attr('src', ele.image_url);
  section.children('img').attr('alt', ele.title);
  section.children('p').append(ele.description);
  section.attr('data-id',ele.keyword);
  //jQuery
  $('main').append(section);
};


// check if already exists
let makeAnimalKeywords = (arr) => {
  arr.forEach(el => {
    if (!keywords.includes(el.keyword)) {
      keywords.push(el.keyword);
    }
  });
};

// append keyword options
let appendKeywordOptions = (keywords) => {
  $('select').empty();
  keywords.forEach(el => {
    $('select').append(`<option value="${el}">${el}</option>`);
  });
};
//select options
let select = () =>{
  $('select').on('change',(event)=>{
    console.log(event.target.value);
    let photos = $('section');
    console.log(photos);
    $.each(photos, (index, value) => {
      console.log(value);
      $(value).show();
      if($(value).attr('data-id') !== event.target.value){

        $(value).hide();
      }
    });
  });
};

pageLoad('data/page-1.json');
$('#pages').on('click', (event)=>{
  console.log(keywords);
  console.log(animalArray);
  keywords=[];
  animalArray=[];
  console.log(keywords);
  console.log(animalArray);
  if(event.target.id==='page1'){
    pageLoad('data/page-1.json');
  }
  else{
    pageLoad('data/page-2.json');
  }
});

