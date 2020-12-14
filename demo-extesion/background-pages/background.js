


/* Open extension opup in new window and maximize the window 
chrome.browserAction.onClicked.addListener(function(tab)    
{
    console.log(tab);

    chrome.windows.create                                                        
    ({
        url: chrome.runtime.getURL("popup-pages/popup.html"), 
        type: "popup",
        state:  "maximized"
    }, 
    function(window){});
});
*/


chrome.runtime.onMessageExternal.addListener( function(request, sender, sendResponse) 
{
    if((request.chromeExtension== true) && (sender.origin== "http://localhost:4200"))
    {
        chrome.browserAction.setBadgeText({'text': 'Start'});
        chrome.storage.local.set({recordOrStop: true});

        chrome.storage.local.get(['recordOrStop'], function(status)
        {
            console.log('status: '+status.recordOrStop);
        });

        /* Send listening request fro all non active tabs of same window */
        chrome.tabs.query({active: false, currentWindow: true}, function(tabs) 
        { 
            for(let index= 0; index< tabs.length; index++)
            {
                console.log('tab Id: '+tabs[index].id);
                chrome.tabs.sendMessage(tabs[index].id, {message: true});
            }
        });

        sendResponse({chromeExtension: 'Extension is activated', data: []});
    }
    else if((request.chromeExtension== false) && (sender.origin== "http://localhost:4200"))
    {
        chrome.browserAction.setBadgeText({'text': 'Stop'});
        chrome.storage.local.set({recordOrStop: false});

        chrome.storage.local.get(['recordOrStop'], function(status)
        {
            console.log('status: '+status.recordOrStop);
        });

        /* Send listening request fro all non active tabs of same window */
        chrome.tabs.query({active: false, currentWindow: true}, function(tabs) 
        {
            for(let index= 0; index< tabs.length; index++)
            {
                console.log('tab Id: '+tabs[index].id);
                chrome.tabs.sendMessage(tabs[index].id, {message: false});
            }
        });

        setTimeout
        (
            function()
            {
                chrome.storage.local.get(['data'], function(userActions)
                {
                    console.log(userActions.data);
                    sendResponse({chromeExtension: 'Extension is deactivated', data: userActions.data});
                    chrome.storage.local.set({data: []});
                });
            }, 
            1000
        );

        
    }

    

    
    
});


/* Take data from content.js and send to popup.js */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    if (request.what == "userAction") 
    {
        console.log(request);
    }
});