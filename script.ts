declare const anime;

function positionDot(): void {
    const nameDot: HTMLElement = document.getElementById('name-dot');
    const dot: HTMLElement = document.getElementById('dot');
    dot.style.backgroundColor = 'orange';
    dot.style.left = `${nameDot.getBoundingClientRect().left + 3}px`;

}

function fadeElementsOut(): void {
    const targ: NodeListOf<Element> = document.querySelectorAll('body > div');
    const nodes: Array<undefined> = [].slice.call(targ, 1); 

    anime({
        targets: nodes,
        opacity: 0,
        duration: 10,
        delay: anime.stagger(800)
    });
}

function fadeElementsIn(): void {   
       
    const targ: NodeListOf<Element> = document.querySelectorAll('body > div');
    const nodes: Array<undefined> = [].slice.call(targ, 1); 

    anime({
        targets: nodes,
        opacity: 1,
        duration: 10,
        delay: anime.stagger(750)
    });    
}

function createProject(title: string, desc: string): void {
    const content: HTMLElement = document.getElementById('projects-wrap');
    const project: HTMLElement = document.createElement('div');
    project.className = "project";
    const screenshot: HTMLElement = document.createElement('div');
    screenshot.className = "screenshot";
    const info: HTMLElement = document.createElement('div');
    info.className = "info";

    const projTitle: HTMLElement = document.createElement('span');
    projTitle.textContent = title;
    const projDesc: HTMLElement = document.createElement('span');
    projDesc.textContent = desc;

    content.appendChild(project);
    project.appendChild(screenshot);
    project.appendChild(info);
    info.appendChild(projTitle);
    info.appendChild(projDesc);
}

function clearPage(): void {
    const titleWrap: HTMLElement = document.getElementById('title-wrap');
    const content: HTMLElement = document.getElementById('content-wrap');

    while(titleWrap.lastChild) {
        titleWrap.removeChild(titleWrap.lastChild);
    }

    while(content.lastChild) {
        content.removeChild(content.lastChild);
    }
}

function renderHome(): void {
    const titleWrap: HTMLElement = document.getElementById('title-wrap');
    const name: HTMLElement = document.createElement('span');
    const nameDot: HTMLElement = document.createElement('span');

    nameDot.appendChild(document.createTextNode('.'));

    // Put the new text in
    name.appendChild(document.createTextNode("Daniel J"));
    name.appendChild(nameDot);
    name.appendChild(document.createTextNode(" Lee"));

    name.id = "name";
    nameDot.id = "name-dot";

    titleWrap.appendChild(name);

    const contentWrap: HTMLElement = document.getElementById('content-wrap');
    const navList: HTMLElement = document.createElement('ul');
    navList.id = "nav-list";
    const projLink: HTMLElement = document.createElement('li');
    projLink.id = "project-link";
    
    const aboutLink: HTMLElement = document.createElement('li');
    aboutLink.id = "about-link";
    
    contentWrap.appendChild(navList);
    navList.appendChild(projLink);
    navList.appendChild(aboutLink);

    projLink.appendChild(document.createTextNode("Projects"));
    aboutLink.appendChild(document.createTextNode("About"));
}

function animeDotBack(): void {
    //get location of namedot, calculate x and y offset
    const nameDot: HTMLElement = document.getElementById('name-dot');
    const dot: HTMLElement = document.getElementById('dot');

    const nameTop = nameDot.getBoundingClientRect().top;
    const nameLeft = nameDot.getBoundingClientRect().left;

    const xOffset = nameLeft - dot.getBoundingClientRect().left;
    const yOffset = nameTop - dot.getBoundingClientRect().top;

    console.log(`dotTop ${dot.getBoundingClientRect().top}`);
    console.log(`dotLeft ${dot.getBoundingClientRect().left}`);

    console.log(`nameTop ${nameTop}`);
    console.log(`nameLeft ${nameLeft}`);

    console.log(`xOffset ${xOffset}`);
    console.log(`yOffset ${yOffset}`);

    const myTimeline = anime.timeline();

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
    })
}

function renderProjects(): void {
    const titleWrap: HTMLElement = document.getElementById('title-wrap');
    const content: HTMLElement = document.getElementById('content-wrap');
    const dot: HTMLElement = document.getElementById('dot');
    const backDot: HTMLElement = document.createElement('div');
    backDot.id = "back-dot";
    const back: HTMLElement = document.createElement('span');
    back.textContent = "<";
    const proj: HTMLElement = document.createElement('span');
    proj.textContent = 'Projects';

    titleWrap.appendChild(backDot);
    backDot.appendChild(back);

    content.id = "projects-wrap";

    //position backdot ontop of dot
    backDot.style.top = `${dot.getBoundingClientRect().top + 17.4}px`;
    backDot.style.left = `${dot.getBoundingClientRect().left + 18}px`;

    titleWrap.appendChild(proj);
  
    createProject("Project Title", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio velit quaerat illum at aspernatur consectetur corporis eum nam hic quam cum ut necessitatibus optio obcaecati, provident distinctio, possimus maiores excepturi nobis animi aut. Quam vel provident, repudiandae facere ducimus esse aperiam ex totam adipisci quis ea unde ipsum aliquam ratione!");

    createProject("Project Title", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio velit quaerat illum at aspernatur consectetur corporis eum nam hic quam cum ut necessitatibus optio obcaecati, provident distinctio, possimus maiores excepturi nobis animi aut. Quam vel provident, repudiandae facere ducimus esse aperiam ex totam adipisci quis ea unde ipsum aliquam ratione!");

    fadeElementsIn();

    setTimeout( function() { 
        dot.style.opacity = '0';
        backDot.addEventListener('click', (e) => {

            dot.style.opacity = '1';
            content.id = "content-wrap";
    
            fadeElementsOut();
    
            setTimeout( function() { 
                clearPage(); 
                renderHome();
                animeDotBack();
                //render homepage, animate dot
            }, 2500 );

            setTimeout( function() { 
                
                fadeElementsIn();
                //fade elements in, add event listeners
                navListEventListeners();
            }, 6000 );
        });
    }, 1000 );    
}

function navListEventListeners(): void {
    //onload add event listeners to links
    const navList:HTMLCollectionOf<HTMLLIElement> = document.getElementsByTagName('li');

    for(let i: number = 0; i < navList.length; i++) {
        navList[i].addEventListener('click', () => {
            //position dot in place, fade elements out and set timer to link.
            navList[i].style.pointerEvents = 'none';
            positionDot();
            fadeElementsOut();

            const myTimeline = anime.timeline();

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
            })

            //clear page then render appropriate pages.
            if(i == 0) {
                //projects page
                setTimeout( function() { 
                    clearPage(); 
                    renderProjects();
                }, 4000 );
            } else {
                //about page

            }
            
        });
    }
}

fadeElementsIn();

navListEventListeners();