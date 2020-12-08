

console.log('Pritam Kininge');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) 
{
    console.log('inside message listener');
    console.log(sender);
    console.log(request);
});