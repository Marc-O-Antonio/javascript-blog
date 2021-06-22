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

    clickedElement.classList.add('active')

    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");

    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const tragetArticle = document.querySelector(articleSelector)

    console.log(tragetArticle)

    /* [DONE] add class 'active' to the correct article */

    tragetArticle.classList.add('active');
  }

  /* SECOND SCRIPT */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list'; /* musiałem dodać 'const' bo nie chciał czytać jako stałej */


  function generateTitleLinks(){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = ' ';

    console.log ('usunięcie zawartości ul "list titles" ' + titleList )

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute("id");

      console.log('odczytanie "id" artykułu " ' + articleId )

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      console.log('odczytuje "title" artykułu ' + articleTitle)
      /* get the title from the title element */
      /* ... */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML)

      /* insert link into html variable */
      html = html + linkHTML;

      console.log(html)
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    console.log(links)

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }


  generateTitleLinks();

  function generateTags(){
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

      console.log('stowrzona zmienna "html" z pustym "string"')

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute("data-tags");

      console.log('odczytanie "data-tags" artykułu " ' + articleTags );

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log('podział tagów na tabele', articleTagsArray);

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray){

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        console.log('generowanie linku dla tagu ' + tag + ' : ' + linkHTML)

        /* add generated code to html variable */

        html = html + linkHTML;

        console.log(html)

      /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;

      /* tagsWrapper.insertAdjacentHTML('afterbegin', html); */

    /* END LOOP: for every article: */
    }
  }

  generateTags();

}





