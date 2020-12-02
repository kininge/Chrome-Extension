
chrome.runtime.onMessageExternal.addListener( function(request, sender, sendResponse) 
{
    if(request.request== 'getDOM')
    {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
            console.log(tabs);
            chrome.tabs.sendMessage(tabs[0].id, {request: "getDOM"}, function(response) 
            {
                var DOM= response.message;
                sendResponse({message: DOM});
            });
        });
    }
});