


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