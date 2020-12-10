
window.recordOrStopButton;


window.addEventListener('DOMContentLoaded', function()
{
    window.recordOrStopButton= document.getElementById('recordOrStop');

    /* set initial state of record or stop button */
    chrome.storage.local.get(['recordOrStop'], function(status)
    {
        var buttonStatus= status.recordOrStop;

        if((buttonStatus== true) || (buttonStatus== null) || (buttonStatus== undefined))
        {
            window.recordOrStopButton.innerHTML= 'Record';
            chrome.storage.local.set({recordOrStop: false})
        }
        else
        {
            window.recordOrStopButton.innerHTML= 'Stop';
            chrome.storage.local.set({recordOrStop: true})
        }
    });

    /* chnage status of record and stop button */
    window.recordOrStopButton.addEventListener("click", function() 
    {
        var buttonStatus= window.recordOrStopButton.innerHTML;
        console.log(buttonStatus);

        if(buttonStatus== 'Record')
        {
            chrome.storage.local.set({recordOrStop: true})
            window.recordOrStopButton.innerHTML= 'Stop';
        }
        else
        {
            chrome.storage.local.set({recordOrStop: true})
            recordOrStopButton.innerHTML= 'Record';
        }
        
    });


});


