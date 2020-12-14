


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

        /* Send listening request fro all non active tabs of same window */
        chrome.tabs.query({active: false, currentWindow: true}, function(tabs) 
        {
            console.log('all tabs: ');
            console.log(tabs);

            chrome.storage.local.set({recordOrStop: true});
            for(let index= 0; index< tabs.length; index++)
            {
                chrome.tabs.sendMessage(tabs[index].id, {message: true});
            }
            
        });

        sendResponse({chromeExtension: 'Extension is activated'});
    }
    else if((request.chromeExtension== false) && (sender.origin== "http://localhost:4200"))
    {
        chrome.browserAction.setBadgeText({'text': 'Stop'});

        /* Send listening request fro all non active tabs of same window */
        chrome.tabs.query({active: false, currentWindow: true}, function(tabs) 
        {
            console.log('all tabs: ');
            console.log(tabs);

            chrome.storage.local.set({recordOrStop: false});
            for(let index= 0; index< tabs.length; index++)
            {
                chrome.tabs.sendMessage(tabs[index].id, {message: true});
            }
            
        });

        sendResponse({chromeExtension: 'Extension is deactivated'});
    }
});


/* Take data from content.js and send to popup.js */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    if (request.what == "userAction") 
    {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
        {
            //chrome.pageAction.show(tabs[0].id);
        });
    }
});