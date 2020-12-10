
window.recordOrStopButton;
window.userActionParent;
window.userActionsList= [];

/* set initial state of record or stop button */
chrome.storage.local.get(['recordOrStop'], function(status)
{
    window.recordOrStopButton= document.getElementById('recordOrStop');
    var buttonStatus= status.recordOrStop;

    if((buttonStatus== true) || (buttonStatus== null) || (buttonStatus== undefined))
    {
        window.recordOrStopButton.innerHTML= 'Record';
    }
    else
    {
        window.recordOrStopButton.innerHTML= 'Stop';
    }
});

window.addEventListener('DOMContentLoaded', function()
{
    window.recordOrStopButton= document.getElementById('recordOrStop');

    /* chnage status of record and stop button */
    window.recordOrStopButton.addEventListener("click", function() 
    {
        var buttonStatus= window.recordOrStopButton.innerHTML;

        if(buttonStatus== 'Record')
        {
            chrome.storage.local.set({recordOrStop: true})
            window.recordOrStopButton.innerHTML= 'Stop';

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
            {
                chrome.tabs.sendMessage(tabs[0].id, {message: true});
            });
        }
        else
        {
            chrome.storage.local.set({recordOrStop: true})
            recordOrStopButton.innerHTML= 'Record';

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
            {
                chrome.tabs.sendMessage(tabs[0].id, {message: false});
            });

        }
        
    });
});

function inserUserAction(userActionData)
{
    window.userActionParent= document.getElementById("user-actions");

    var newUserAction = document.createElement("DIV");
    newUserAction.setAttribute("id", userActionData.stepId);
    newUserAction.className= "user-action";

    var child1= document.createElement("DIV");
    child1.className= "action item1";
    child1.innerHTML= userActionData.userAction;

    var child2= document.createElement("DIV");
    child2.className= "action item2";
    child2.innerHTML= userActionData.label;

    var child3= document.createElement("DIV");
    child3.className= "action item3";
    child3.innerHTML= userActionData.targetedElement;

    var child4= document.createElement("DIV");
    child4.className= "action item4";
    child4.innerHTML= userActionData.value;

    newUserAction.appendChild(child1);
    newUserAction.appendChild(child2);
    newUserAction.appendChild(child3);
    newUserAction.appendChild(child4);

    window.userActionParent.appendChild(newUserAction);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    console.log(request.data);
    window.userActionsList.push(request.data);
    inserUserAction(request.data);
});
