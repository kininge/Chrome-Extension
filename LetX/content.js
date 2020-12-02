

window.addEventListener('DOMContentLoaded', function()
{
    var step= 0;
    init(step);
});


function init(step)
{
    document.addEventListener("mousedown", function(event)
    {
        step+= 1;
        console.log("Step: "+step);
        console.log(event.target);
        console.log();
    });
}