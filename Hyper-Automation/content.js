chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) 
{
    if(request.request== 'getDOM')
    {
        var DOM= document.getElementsByTagName('html')[0].outerHTML;
        sendResponse({message: DOM});
    }
});
