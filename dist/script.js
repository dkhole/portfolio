function positionDot() {
    var nameDot = document.getElementById('name-dot');
    var dot = document.getElementById('dot');
    dot.style.backgroundColor = 'orange';
    dot.style.left = nameDot.getBoundingClientRect().left + 3 + "px";
}
function fadeElementsOut() {
    var targ = document.querySelectorAll('body > div');
    var nodes = [].slice.call(targ, 1);
    anime({
        targets: nodes,
        opacity: 0,
        duration: 10,
        delay: anime.stagger(800)
    });
}
function fadeElementsIn() {
    var targ = document.querySelectorAll('body > div');
    var nodes = [].slice.call(targ, 1);
    anime({
        targets: nodes,
        opacity: 1,
        duration: 10,
        delay: anime.stagger(750)
    });
}
function createProject(title, desc) {
    var content = document.getElementById('projects-wrap');
    var project = document.createElement('div');
    project.className = "project";
    var screenshot = document.createElement('div');
    screenshot.className = "screenshot";
    var info = document.createElement('div');
    info.className = "info";
    var projTitle = document.createElement('span');
    projTitle.className = "proj-title";
    projTitle.textContent = title;
    var projDesc = document.createElement('span');
    projDesc.textContent = desc;
    projDesc.className = "proj-desc";
    var lineBr1 = document.createElement('br');
    var lineBr2 = document.createElement('br');
    content.appendChild(project);
    project.appendChild(screenshot);
    project.appendChild(info);
    info.appendChild(projTitle);
    info.appendChild(lineBr1);
    info.appendChild(lineBr2);
    info.appendChild(projDesc);
}
function clearPage() {
    var titleWrap = document.getElementById('title-wrap');
    var content = document.getElementById('content-wrap');
    while (titleWrap.lastChild) {
        titleWrap.removeChild(titleWrap.lastChild);
    }
    while (content.lastChild) {
        content.removeChild(content.lastChild);
    }
}
function renderHome() {
    var titleWrap = document.getElementById('title-wrap');
    var name = document.createElement('span');
    var nameDot = document.createElement('span');
    nameDot.appendChild(document.createTextNode('.'));
    // Put the new text in
    name.appendChild(document.createTextNode("Daniel J"));
    name.appendChild(nameDot);
    name.appendChild(document.createTextNode(" Lee"));
    name.id = "name";
    nameDot.id = "name-dot";
    titleWrap.appendChild(name);
    var contentWrap = document.getElementById('content-wrap');
    var navList = document.createElement('ul');
    navList.id = "nav-list";
    var projLink = document.createElement('li');
    projLink.id = "project-link";
    var aboutLink = document.createElement('li');
    aboutLink.id = "about-link";
    contentWrap.appendChild(navList);
    navList.appendChild(projLink);
    navList.appendChild(aboutLink);
    projLink.appendChild(document.createTextNode("Projects"));
    aboutLink.appendChild(document.createTextNode("About"));
}
function animeDotBack() {
    //get location of namedot, calculate x and y offset
    var nameDot = document.getElementById('name-dot');
    var dot = document.getElementById('dot');
    var nameTop = nameDot.getBoundingClientRect().top;
    var nameLeft = nameDot.getBoundingClientRect().left;
    var xOffset = nameLeft - dot.getBoundingClientRect().left;
    var yOffset = nameTop - dot.getBoundingClientRect().top;
    console.log("dotTop " + dot.getBoundingClientRect().top);
    console.log("dotLeft " + dot.getBoundingClientRect().left);
    console.log("nameTop " + nameTop);
    console.log("nameLeft " + nameLeft);
    console.log("xOffset " + xOffset);
    console.log("yOffset " + yOffset);
    var myTimeline = anime.timeline();
    myTimeline.add({
        targets: '#dot',
        translateY: yOffset + 15.5,
        duration: 1000,
        borderRadius: ['50%', '0%'],
        scale: 0.9,
        rotate: '90deg',
        easing: 'easeOutSine'
    })
        .add({
        targets: '#dot',
        translateX: xOffset - 313,
        duration: 1500,
        easing: 'easeInOutElastic(1, .5)'
    });
}
function renderProjects() {
    var titleWrap = document.getElementById('title-wrap');
    var content = document.getElementById('content-wrap');
    var dot = document.getElementById('dot');
    var backDot = document.createElement('div');
    backDot.id = "back-dot";
    var back = document.createElement('span');
    back.textContent = "←";
    var proj = document.createElement('span');
    proj.textContent = 'Projects';
    titleWrap.appendChild(backDot);
    backDot.appendChild(back);
    content.id = "projects-wrap";
    //position backdot ontop of dot
    backDot.style.top = dot.getBoundingClientRect().top + "px";
    backDot.style.left = dot.getBoundingClientRect().left + 3 + "px";
    titleWrap.appendChild(proj);
    createProject("Project Title", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio velit quaerat illum at aspernatur consectetur corporis eum nam hic quam cum ut necessitatibus optio obcaecati, provident distinctio, possimus maiores excepturi nobis animi aut. Quam vel provident, repudiandae facere ducimus esse aperiam ex totam adipisci quis ea unde ipsum aliquam ratione!");
    createProject("Project Title", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio velit quaerat illum at aspernatur consectetur corporis eum nam hic quam cum ut necessitatibus optio obcaecati, provident distinctio, possimus maiores excepturi nobis animi aut. Quam vel provident, repudiandae facere ducimus esse aperiam ex totam adipisci quis ea unde ipsum aliquam ratione!");
    fadeElementsIn();
    setTimeout(function () {
        backDot.addEventListener('click', function (e) {
            fadeElementsOut();
            setTimeout(function () {
                content.id = "content-wrap";
                clearPage();
                renderHome();
                animeDotBack();
                //render homepage, animate dot
            }, 2500);
            setTimeout(function () {
                fadeElementsIn();
                //fade elements in, add event listeners
                navListEventListeners();
            }, 6000);
        });
    }, 1000);
}
function navListEventListeners() {
    //onload add event listeners to links
    var navList = document.getElementsByTagName('li');
    var _loop_1 = function (i) {
        navList[i].addEventListener('click', function () {
            //position dot in place, fade elements out and set timer to link.
            navList[i].style.pointerEvents = 'none';
            positionDot();
            fadeElementsOut();
            var myTimeline = anime.timeline();
            myTimeline.add({
                targets: '#dot',
                translateX: -300,
                duration: 1500,
                delay: 1000,
                easing: 'easeInOutElastic(1, .5)'
            })
                .add({
                targets: '#dot',
                translateY: -10,
                duration: 2000,
                borderRadius: ['0%', '50%'],
                scale: 4,
                rotate: '80deg',
                easing: 'easeOutSine'
            });
            //clear page then render appropriate pages.
            if (i == 0) {
                //projects page
                setTimeout(function () {
                    clearPage();
                    renderProjects();
                }, 4000);
            }
            else {
                //about page
            }
        });
    };
    for (var i = 0; i < navList.length; i++) {
        _loop_1(i);
    }
}
fadeElementsIn();
navListEventListeners();
