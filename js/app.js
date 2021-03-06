'use strict';

// Animal Array
let animalArray = [];
// create array of keywords
let keywords = [];
// Sort Option
let sort = 'name';
let page = 'page1';

let AnimalObj = function(filePath, title, descript, keyword, horns) {
  this.image_url = filePath;
  this.title = title;
  this.description = descript;
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
    });

    if (sort === 'name') {
      animalArray.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      animalArray.sort((a, b) => a.horns - b.horns);
    }

    animalArray.forEach(ele => {
      makeAnimalSection(ele);
    });

    makeAnimalKeywords(animalArray);
    appendKeywordOptions(keywords);
    select();
  });
};

// create clone of animal section
let makeAnimalSection = (ele) => {
  let source = $('#image-template').text();
  let imageTemplate = Handlebars.compile(source);
  let html = imageTemplate({keyword: ele.keyword, title: ele.title, imgURL: ele.image_url, description: ele.description});
  $('main').append(html);
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
    let photos = $('section');
    $.each(photos, (index, value) => {
      $(value).show();
      if($(value).attr('data-id') !== event.target.value){
        $(value).hide();
      }
    });
  });
};

pageLoad('data/page-1.json');
$('#pages').on('click', (event)=>{
  keywords=[];
  animalArray=[];
  if(event.target.id==='page1'){
    page = 'page1';
    pageLoad('data/page-1.json');
  }
  else{
    page = 'page2';
    pageLoad('data/page-2.json');
  }
});

$('#sort').on('click', (event) => {
  sort = event.target.id;
  keywords=[];
  animalArray=[];
  if (page === 'page1') {
    pageLoad('data/page-1.json');
  } else {
    pageLoad('data/page-2.json');
  }
});
