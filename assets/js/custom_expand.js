let hamburger = document.querySelector('div.hamburger');
let btnwrapper = document.querySelector('.navbar-content');


// This is the important part!
function collapseSection(element) {

    // get the height of the element's inner content, regardless of its actual size
    let sectionHeight = element.scrollHeight;

    // temporarily disable all css transitions
    let elementTransition = element.style.transition;
    element.style.transition = '';

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {

        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        let classHiddenAdded = false;
        requestAnimationFrame(function() {
            element.style.height = null;

            if (!classHiddenAdded) {
                element.classList.add('hidden');
                classHiddenAdded = true;
            }

        });
    });

    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');

}

function expandSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;

    element.classList.remove('hidden')

    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';

    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);

        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
    });

    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
}

hamburger.addEventListener('click', function(e) {

    var isCollapsed = btnwrapper.getAttribute('data-collapsed') === 'true';

    if (isCollapsed) {
        expandSection(btnwrapper)
        btnwrapper.setAttribute('data-collapsed', 'false')
    } else {
        collapseSection(btnwrapper)
    }
});