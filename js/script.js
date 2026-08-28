const aboutBtn = document.querySelector("#about-btn");
const projectsBtn = document.querySelector("#projects-btn");
const contactBtn = document.querySelector("#contact-btn");

const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const contact = document.querySelector("#contact");

const pages = [about, projects, contact];
const buttons = [aboutBtn, projectsBtn, contactBtn];

//switches "page" upon button click, uses a fade in/out effect
function switchPage(newPage, newPageBtn, urlUpdate, firstLoad) {
  let timeMod = firstLoad ? 0 : 1; //if this is the first load, cancel all fade effects

  //lower opacity for fade in/out
  for (let page of pages) {
    page.style.opacity = 0;
  }

  //delay the following, giving time for the opacity change to take effect / the old page to fade out
  setTimeout(() => {
    //hide all pages
    for (let page of pages) {
      page.style.display = "none";
    }
    //remove current class from & enable all buttons
    for (let btn of buttons) {
      btn.classList.remove("current");
      btn.disabled = false;
    }
    //unhide page user clicked on
    newPage.style.display = "block";
    //delay the following, creating a fade-in effect
    setTimeout(() => {
      //give the page's button the "current" class, set opacity to 100% (creating a fade-in effect)
      newPage.style.opacity = 1;
      newPageBtn.classList.add("current");
      newPageBtn.disabled = true;

      //update url only if urlUpdate is true
      if (urlUpdate) {
        //about is home and /about doesnt exist, dont add it to url
        window.location.hash = newPage.id == "about" ? "" : newPage.id;

        //scroll to top - mostly for mobile
        document.querySelector("#content-area").scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 100 * timeMod);
  }, 500 * timeMod);
}

aboutBtn.addEventListener("click", () => {
  switchPage(about, aboutBtn, true);
});
projectsBtn.addEventListener("click", () => {
  switchPage(projects, projectsBtn, true);
});
contactBtn.addEventListener("click", () => {
  switchPage(contact, contactBtn, true);
});

//whenever url is loaded or back button is pressed, bring up page that corresponds to the current url
function loadPage(firstLoad) {
  const pageName = window.location.hash.slice(1);
  const pageNames = ["about", "projects", "contact"];

  if (pageName == "") {
    switchPage(about, aboutBtn, false, firstLoad);
    return;
  } else {
    for (let i in pageNames) {
      if (pageName == pageNames[i]) {
        switchPage(pages[i], buttons[i], false, firstLoad);
      }
    }
  }
}
//https://stackoverflow.com/questions/824349/how-do-i-modify-the-url-without-reloading-the-page
window.addEventListener("hashchange", () => loadPage(false)); //make back/forward buttons work
loadPage(true); //call this on page load to display page that corresponds to url
