'use strict';
{

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const tragetArticle = document.querySelector(articleSelector);

    console.log(tragetArticle);

    /* [DONE] add class 'active' to the correct article */

    tragetArticle.classList.add('active');
  };

  /* SECOND SCRIPT */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagListSelector = '.tags.list',
    optCloudClassCount = ' 5',
    optCloudClassPrefix = 'tag-size-'




  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = ' ';

    console.log ('usunięcie zawartości ul "list titles" ' + titleList );

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    console.log('wartość "customSelector to : ', customSelector);

    console.log('wartość "optArticleSelector" to ', optArticleSelector);

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');

      console.log('odczytanie "id" artykułu " ' + articleId );

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      console.log('odczytuje "title" artykułu ' + articleTitle);


      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML);

      /* insert link into html variable */
      html = html + linkHTML;

      console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }


  generateTitleLinks();

  function calculateTagsParams(tags){

    const params = {

      max:0,
      min:999999

    };

    for(let tag in tags){

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max){

        params.max = tags[tag];

      }

      if(tags[tag] < params.min){

        params.min = tags[tag]

      }

    }

    return params;
  }

  function calculateTagClass(count, params){

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix+classNumber;

  }

  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    console.log('stówrz tablicę ', allTags)

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log('wyszukanie wszystkich artyułów ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      console.log('znalezienie wrapperów tagów ' , tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      console.log('stowrzona zmienna "html" z pustym "string"');

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log('odczytanie "data-tags" artykułu " ' + articleTags );

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log('podział tagów na tabele', articleTagsArray);

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray){

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

        console.log('generowanie linku dla tagu ' + tag + ' : ' + linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;

        console.log(html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          console.log('sprawdź czy link tagu znajduje się w tablicy allTags');

          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;

          console.log('jeżeli link tagu nie znajduje się w obiekcie to go dodaj');
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;

      /* tagsWrapper.insertAdjacentHTML('afterbegin', html); */

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    console.log('stała tagList wyszukuje tagów w prawej kolumni (.tags)');

    /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');

    console.log('!!!!!!!!!!!!!!!!!dodaj link html z stałe allTags do tablicy tagList', allTags)

    /* [NEW] create variable for all links HTML code */

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in all tags: */

    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</li>';

      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;

     // allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>'
      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;




  }


  generateTags();



  function tagClickHandler(event){
  /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log('Kliknięto "tag" ', this );

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('kliknięty odnośnik to ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log('Wyciągnięty "tag" z linku to: ', tag);

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('Linki tagów z klasą "active" ', activeTagLinks);

    /* START LOOP: for each active tag link */

    for(let activeTagLink of activeTagLinks) {

      /* remove class active */

      activeTagLink.classList.remove('active');

      console.log('Usunięto klasę "active" w activeTagLink');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('znalezienie linków tagów z href równym stałej href ', tagLinks);

    /* START LOOP: for each found tag link */

    for(let tagLink of tagLinks) {

      /* add class active */

      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){
  /* find all links to tags */

    const tagLinks = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */

    for(let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  }

  addClickListenersToTags();

  /* third script */

  function generateAuthors(){

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log('wyszukanie wszystkich artyułów ', articles);


    /* START LOOP: for every article: */
    for(let article of articles){

      /* find Authors wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      console.log('znalezienie wrapperów dla autorów', authorWrapper);

      /* make html variable with empty string */

      let html = '';

      console.log('ztworzenie zmiennej "html" z pustym "string" ', html);

      /* get author from post-author attribute */

      const articleAuthor = article.getAttribute('data-author');

      console.log('przez kogo został napisany artykuł z "data-author" ' + articleAuthor);

      /* generate HTML of the link */

      const linkHTML = '<a href="#author-' + articleAuthor + '"<span>' + articleAuthor + '</span></a>';

      console.log('stworzone link HTML : ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      console.log('zmiana zawarości string w zmiennej "html"na : ', html);

      /* insert HTML of all the links into the authors wrapper */

      authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }

  }

  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */

    event.preventDefault();

    console.log('wyłączenie domyślnych funkcji "event" takich jak np. przenoszenie po kliknięciu na górę strony');

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log('kliknięto "autora"', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('ustawienie zienej html z wyciągniętym atrybutem href z klikniętego atrybutu ', href)

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-','');

    console.log('wyciągnięty uthor z linku to: ', author);

    /* find all authors links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    console.log('wszystkie linki autorów z klasą "active" ', activeAuthorLinks);

    /* START LOOP: for each active author link */

    for (let activeAuthorLink of activeAuthorLinks){

      /* remove class active */

      activeAuthorLink.classList.remove('active');

      console.log('usunięto klasę "active" w activeAuthorsLink')

      /* END LOOP: for each active tag link */

    }

    /* find all authors links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('znalezienie linków autorów z href = stałej "href" : ', authorLinks);

    /* START LOOP: for each found author link */

    for (let authorLink of authorLinks){
      /* add class active */

      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

  }



  function addClickListenersToAuthors(){
    /* find all links to authors */

    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */

    for(let authorLink of authorLinks){

      /* add authorClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

}

