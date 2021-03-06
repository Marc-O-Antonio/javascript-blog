'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-authorListLink').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  }

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
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list',
    optAuthorClassCount = '5',
    optAuthorclassPrefix = 'author-size-';





  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = ' ';

    console.log ('usuni??cie zawarto??ci ul "list titles" ' + titleList );

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    console.log('warto???? "customSelector to : ', customSelector);

    console.log('warto???? "optArticleSelector" to ', optArticleSelector);

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');

      console.log('odczytanie "id" artyku??u " ' + articleId );

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      console.log('odczytuje "title" artyku??u ' + articleTitle);


      /* create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

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

    console.log('st??wrz tablic?? ', allTags)

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log('wyszukanie wszystkich artyu????w ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      console.log('znalezienie wrapper??w tag??w ' , tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      console.log('stowrzona zmienna "html" z pustym "string"');

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log('odczytanie "data-tags" artyku??u " ' + articleTags );

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log('podzia?? tag??w na tabele', articleTagsArray);

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray){

        /* generate HTML of the link */

        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

        //console.log('generowanie linku dla tagu ' + tag + ' : ' + linkHTML);
        const linkHTMLData = {tag: tag, };
        const linkHTML = templates.articleTagLink(linkHTMLData);

        /* add generated code to html variable */

        html = html + linkHTML;

        console.log(html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          console.log('sprawd?? czy link tagu znajduje si?? w tablicy allTags');

          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;

          console.log('je??eli link tagu nie znajduje si?? w obiekcie to go dodaj');
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
    const tagList = document.querySelector(optTagListSelector);

    console.log('sta??a tagList wyszukuje tag??w w prawej kolumni (.tags)');

    /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');

    console.log('!!!!!!!!!!!!!!!!!dodaj link html z sta??e allTags do tablicy tagList', allTags)

    /* [NEW] create variable for all links HTML code */

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in all tags: */

    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

      //console.log('tagLinkHTML:', tagLinkHTML);

      //allTagsHTML += tagLinkHTML;

     // allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>'

      allTagsData.tags.push ({
        tag: tag,
        count: allTags[tag],
        class: calculateTagClass(allTags[tag], tagsParams),
      });
      /* [NEW] END LOOP: for each tag in allTags: */


    }

    /* [NEW] add HTML from allTagsHTML to tagList */

    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);


  }


  generateTags();



  function tagClickHandler(event){
  /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log('Klikni??to "tag" ', this );

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('klikni??ty odno??nik to ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log('Wyci??gni??ty "tag" z linku to: ', tag);

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('Linki tag??w z klas?? "active" ', activeTagLinks);

    /* START LOOP: for each active tag link */

    for(let activeTagLink of activeTagLinks) {

      /* remove class active */

      activeTagLink.classList.remove('active');

      console.log('Usuni??to klas?? "active" w activeTagLink');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('znalezienie link??w tag??w z href r??wnym sta??ej href ', tagLinks);

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

    const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a ');

    /* START LOOP: for each link */

    for(let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  }

  addClickListenersToTags();

  /* third script */

  function calculateAuthorParams(authors){

    const params = {

      max:0,
      min:999999

    };

    for(let articleAuthor in authors){

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + articleAuthor + ' is used ' + authors[articleAuthor] + ' times');

      if(authors[articleAuthor] > params.max){

        params.max = authors[articleAuthor];

      }

      if(authors[articleAuthor] < params.min){

        params.min = authors[articleAuthor]

      }

    }

    return params;
  }

  function calculateAuthorClass(count, params){

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optAuthorClassPrefix+classNumber;

  }

  function generateAuthors(){

    let allAuthors= {}

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log('wyszukanie wszystkich artyu????w ', articles);


    /* START LOOP: for every article: */
    for(let article of articles){

      /* find Authors wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      console.log('znalezienie wrapper??w dla autor??w', authorWrapper);

      /* make html variable with empty string */

      let html = '';

      console.log('ztworzenie zmiennej "html" z pustym "string" ', html);

      /* get author from post-author attribute */

      const articleAuthor = article.getAttribute('data-author');

      console.log('przez kogo zosta?? napisany artyku?? z "data-author" ' + articleAuthor);

      /* generate HTML of the link */

      //const linkHTML = '<a href="#author-' + articleAuthor + '"<span>' + 'by ' + articleAuthor + '</span></a>';

      //console.log('stworzone link HTML : ', linkHTML);

      const linkHTMLData = {articleAuthor: articleAuthor,};
      const linkHTML = templates.articleAuthorLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + linkHTML;

      console.log('zmiana zawaro??ci string w zmiennej "html"na : ', html);



         /* [NEW] check if this link is NOT already in allTags */
         if(!allAuthors[articleAuthor]) {
          console.log('sprawd?? czy link tagu znajduje si?? w tablicy allTags');

          /* [NEW] add generated code to allTags object */
          allAuthors[articleAuthor] = 1;

          console.log('je??eli link tagu nie znajduje si?? w obiekcie to go dodaj');
        } else {
          allAuthors[articleAuthor]++;
        }
      /* insert HTML of all the links into the authors wrapper */

      authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }

    const authorList = document.querySelector(optAuthorsListSelector);

    console.log('sta??a authorList wyszukuje author??w w prawej kolumni (.list.authors)', authorList);

    const authorsParams = calculateAuthorParams(allAuthors);
    console.log('authorsParams: ', authorsParams);

    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};

    for(let articleAuthor in allAuthors){

      //const authorLinkHTML = '<li><a class="'/* + calculateTagClass(allAuthors[articleAuthor], authorsParams)*/ + '" href="#author-' + articleAuthor + '">' + articleAuthor + '</a> (' + allAuthors[articleAuthor] + ')</li>';

      //console.log('authorLinkHTML:', authorLinkHTML);

      //allAuthorsHTML += authorLinkHTML;
      allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor],
        className: calculateTagClass(allAuthors, authorsParams)
      });
    }

    //authorList.innerHTML = allAuthorsHTML;
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log('authorList: ', authorList);
  }

  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */

    event.preventDefault();

    console.log('wy????czenie domy??lnych funkcji "event" takich jak np. przenoszenie po klikni??ciu na g??r?? strony');

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log('klikni??to "autora"', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('ustawienie zienej html z wyci??gni??tym atrybutem href z klikni??tego atrybutu ', href)

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-','');

    console.log('wyci??gni??ty uthor z linku to: ', author);

    /* find all authors links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    console.log('wszystkie linki autor??w z klas?? "active" ', activeAuthorLinks);

    /* START LOOP: for each active author link */

    for (let activeAuthorLink of activeAuthorLinks){

      /* remove class active */

      activeAuthorLink.classList.remove('active');

      console.log('usuni??to klas?? "active" w activeAuthorsLink')

      /* END LOOP: for each active tag link */

    }

    /* find all authors links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('znalezienie link??w autor??w z href = sta??ej "href" : ', authorLinks);

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

