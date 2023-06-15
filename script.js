// Select the elements
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const box = document.querySelector('.box');
const boxMenu = document.getElementById('box-menu');

// global variables

// controls the number of different keyframes there are 
let numStates = 1;
let selectedMenuId = 0;
// let keyframes = [];
let keyframes = [];


const keyframeMenus = document.querySelectorAll('.keyframe-menu');
keyframeMenus.forEach(menu => {
    menu.addEventListener('submit', e => {
        e.preventDefault();
    })
})

function showForm(selectedMenu){
    const keyframeMenus = document.querySelectorAll('.keyframe-menu');
    keyframeMenus.forEach(menu => {
        menu.classList.add('hide');
        console.log(menu)
    })
    console.log(selectedMenu)
    selectedMenu.classList.remove('hide');
}

//events





boxMenu.addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();


    // Get the form values
    const prevNumStates = numStates;
    numStates = document.getElementById('num-states').value;


    if (numStates != 0 && numStates != '' && prevNumStates != numStates){
        console.log('render new forms')
        // reshape keyframes array
        keyframes = [...Array(numStates)]
        if (numStates > keyframes.length){
            const emptyArray = [...Array.from(numStates - keyframes.length)]
            keyframes = keyframes.concat(emptyArray)
        } else {
            kkeyframes = keyframes.slice(0, numStates)
        }
        let keyframesCopy = keyframes.slice(0, numStates);
        renderForms();
    }

    const duration = document.getElementById('duration').value;
    const timing = document.getElementById('timing').value;
    const iterationCount = document.getElementById('iterationCount').value;
    const direction = document.getElementById('direction').value;
    handleAnimationMenu(duration, timing, iterationCount, direction)
})


function handleAnimationMenu(duration, timing, iterationCount, direction){
    box.style.animationDuration = duration;
    box.style.animationTimingFunction = timing;
    box.style.animationIterationCount = iterationCount;
    box.style.animationDirection = direction;
};


function renderForms(){
    const keyframeMenuContainer = document.querySelector('.keyframe-menu-container')
    clearContainer(keyframeMenuContainer);
    selectedMenuId = 1;
    for (let i = 0; i < parseInt(numStates); i++){
        // Create form element
        const form = document.createElement('form');
        form.className = 'keyframe-menu menu';
        if (i != 0) form.className += ' hide';

        // Create header element
        const header = document.createElement('header');

        // Create h2 element for form title
        const formTitle = document.createElement('h2');
        formTitle.className = 'form-title';
        formTitle.textContent = 'Form ';

        // Create span element for form count
        const formCount = document.createElement('span');
        formCount.className = 'form-count';
        formCount.textContent = i+ 1;

        // Append form title and form count to header
        formTitle.appendChild(formCount);
        header.appendChild(formTitle);

        // Create buttons div
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        // Create prev button
        const prevButton = document.createElement('button');
        prevButton.className = 'prev';
        prevButton.textContent = 'prev';

        // Create next button
        const nextButton = document.createElement('button');
        nextButton.className = 'next';
        nextButton.textContent = 'next';
        // Add click event listeners
        prevButton.addEventListener('click', () => {
            if (selectedMenuId == 1){
                selectedMenuId = numStates;
            } else {
                selectedMenuId -= 1;
            }
            const keyframeMenus = document.querySelectorAll('.keyframe-menu');
            const selectedMenu = [...keyframeMenus].find((menu, idx) => idx == (selectedMenuId - 1));
            console.log(selectedMenu)
            showForm(selectedMenu);
        });

        nextButton.addEventListener('click', () => {
            if (selectedMenuId == numStates){
                selectedMenuId = 1
            } else{
                selectedMenuId += 1;
            }
            const keyframeMenus = document.querySelectorAll('.keyframe-menu');
            const selectedMenu = [...keyframeMenus].find((menu, idx) => idx == (selectedMenuId - 1));
            showForm(selectedMenu);
        });

        // Append prev and next buttons to buttons div
        buttonsDiv.appendChild(prevButton);
        buttonsDiv.appendChild(nextButton);

        // Append buttons div to header
        header.appendChild(buttonsDiv);

        // Append header to form
        form.appendChild(header);

        // Create setting divs
        const settings = [
        { label: 'checkpoint', id:'checkpoint'},   
        { label: 'color', id: 'color' },
        { label: 'border-radius:', id: 'border-radius' },
        { label: 'px from bottom: ', id: 'bottom' },
        { label: 'px from left: ', id: 'left' }
        ];

        settings.forEach(setting => {
            const settingDiv = document.createElement('div');
            settingDiv.className = 'setting';

            const label = document.createElement('label');
            label.textContent = setting.label;

            const input = document.createElement('input');
            input.type = 'text';
            input.name = '';
            input.dataset.id = setting.id;

            settingDiv.appendChild(label);
            settingDiv.appendChild(input);

            form.appendChild(settingDiv);
        });

        // Create buttons div for clear and ok buttons
        const buttonsDiv2 = document.createElement('div');
        buttonsDiv2.className = 'buttons';

        // Create clear button
        const clearButton = document.createElement('button');
        clearButton.type = 'reset';
        clearButton.textContent = 'clear';

        // Create ok button
        const okButton = document.createElement('button');
        okButton.type = 'submit';
        okButton.textContent = 'ok';
        form.addEventListener('submit', event => {
            handleKeyframeChange(i)
        })
        
        // Append clear and ok buttons to buttons div
        buttonsDiv2.appendChild(clearButton);
        buttonsDiv2.appendChild(okButton);


        form.addEventListener('submit', event => {
            event.preventDefault();

            // Select the input elements for each setting
            const checkpoint = form.querySelector('[data-id="checkpoint"');
            const colorInput = form.querySelector('[data-id="color"')
            const borderRadiusInput = form.querySelector('[data-id="border-radius"]');
            const bottomInput = form.querySelector('[data-id="bottom"]');
            const leftInput = form.querySelector('[data-id="left"]');

            const checkpointValue = checkpoint.value;
            const colorValue = colorInput.value;
            const borderRadiusValue = borderRadiusInput.value;
            const bottomValue = bottomInput.value;
            const leftValue = leftInput.value;

            // Call the handleKeyframeChange function with the values
            handleKeyframeChange(i, checkpointValue, colorValue, borderRadiusValue, bottomValue, leftValue);
        })
        // Append buttons div to form
        form.appendChild(buttonsDiv2);

        // Append form to the document body or a container element
        keyframeMenuContainer.appendChild(form);

    }
}

function handleKeyframeChange(idx, checkpoint, color, borderRadius,  bottom, left) {
  // Get the first stylesheet in the document (could be any stylesheet you want to add to)
  var stylesheet = document.styleSheets[0];
  keyframes[idx] = 
  `${checkpoint}% {
    background-color: ${color};
    border-radius: ${borderRadius};
    bottom: ${bottom}px;
    left: ${left}px;
    }
  `
  const keyframesString = `@keyframes box {
    ${keyframes.join('')}
  }`
  console.log(keyframesString)

  // Append the @keyframes rule to the stylesheet
  stylesheet.insertRule(keyframesString, stylesheet.cssRules.length);
}


function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

renderForms();