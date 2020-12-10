


/* Open extension opup in new window and maximize the window */
chrome.browserAction.onClicked.addListener(function(tab)    
{
    console.log(tab);

    chrome.windows.create                                                        
    ({
        url: chrome.runtime.getURL("index.html"), 
        type: "popup",
        state:  "maximized"
    }, 
    function(window){});
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