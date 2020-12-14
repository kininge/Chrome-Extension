
window.recordOrStopButton;
window.removePreviousData;
window.userActionParent;
window.userActionsList= [];

/* set previous user action data */
chrome.storage.local.get(['actionData'], function(User)
{
    console.log('intiailly data show');
    window.userActionsList= User.actionData;
    console.log(window.userActionsList);

    for(let index= 0; index< window.userActionsList.length; index++)
    {
        inserUserAction(window.userActionsList[index]);
    }
});

/* reload the active tab's website 
chrome.tabs.query({active: true, currentWindow: true}, function(allTabs)
{
    console.log('Reloaded by Hyper-Automation');
    chrome.tabs.reload(allTabs[0].id);
});
*/

/* set initial state of record or stop button */
chrome.storage.local.get(['recordOrStop'], function(status)
{
    window.recordOrStopButton= document.getElementById('recordOrStop');

    var buttonStatus= status.recordOrStop;

    if((buttonStatus== true) || (buttonStatus== null) || (buttonStatus== undefined))
    {
        window.recordOrStopButton.innerHTML= 'Stop';
    }
    else
    {
        window.recordOrStopButton.innerHTML= 'Record';
    }
});

window.addEventListener('DOMContentLoaded', function()
{
    window.recordOrStopButton= document.getElementById('recordOrStop');
    window.removePreviousData= document.getElementById('removeAll');

    /* chnage status of record and stop button */
    window.recordOrStopButton.addEventListener("click", function() 
    {
        var buttonStatus= window.recordOrStopButton.innerHTML;

        chrome.storage.local.get(['recordOrStop'], function(status)
        {  
            var buttonStatus= status.recordOrStop;

            if((buttonStatus== true) || (buttonStatus== null) || (buttonStatus== undefined))
            {
                chrome.storage.local.set({recordOrStop: false})
                window.recordOrStopButton.innerHTML= 'Record';

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    chrome.tabs.sendMessage(tabs[0].id, {message: false});
                });
            }
            else
            {
                chrome.storage.local.set({recordOrStop: true})
                recordOrStopButton.innerHTML= 'Stop';

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    chrome.tabs.sendMessage(tabs[0].id, {message: true});
                });
            }
        });
    });

    /* Remove all previous data */
    window.removePreviousData.addEventListener('click', function()
    {
        console.log('Previous data');
        chrome.storage.local.set({actionData: []});
        window.userActionParent= document.getElementById("user-actions");

        while (window.userActionParent.firstChild) 
        {
            window.userActionParent.removeChild(window.userActionParent.firstChild);
        }
    })
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
    inserUserAction(request.data);

    chrome.storage.local.get(['actionData'], function(User)
    {
        window.userActionsList= User.actionData;

        if((window.userActionsList== []) || (window.userActionsList== null) 
        || (window.userActionsList== undefined) || (window.userActionsList.length== 0))
        {
            window.userActionsList= [];
            window.userActionsList.push(request.data);

            console.log('Set data');
            console.log(window.userActionsList);
            chrome.storage.local.set({actionData: window.userActionsList});
        }
        else
        {
            window.userActionsList.push(request.data);

            console.log('Set data');
            console.log(window.userActionsList);
            chrome.storage.local.set({actionData: window.userActionsList});
        }
    });
});
