
window.isListning= false;
window.userActionsLocal= [];



/* Get request from popup side */
chrome.runtime.onMessage.addListener( async function(request, sender, sendResponse) 
{
    window.isListning= request.message;
    console.log('window.isListning: '+window.isListning);

    if(!window.isListning)
    {
        chrome.storage.local.get(['data'], function(userActions) 
        {
            window.userActionsLocal= userActions.data;

            if(window.userActionsLocal.length> 0)
            {
                chrome.storage.local.get(['getData'], async function(Feild) 
                {
                    if(Feild.getData)
                    {
                        await getInsertedData();

                        //var s= window.userActionsLocal.toString();
                        //sendResponse({userActions: "Hi asdgv"});
                        console.log(window.userActionsLocal);

                        chrome.storage.local.set({data: []});
                        window.userActionsLocal= [];
                    }
                    else
                    {
                        //var s= window.userActionsLocal.toString();
                        //sendResponse({userActions: "Hi Pritam"});
                        console.log(window.userActionsLocal);

                        chrome.storage.local.set({data: []});
                        window.userActionsLocal= [];
                    }
                }); 
            }
        });

    }
});

/* To listen mousedown or button click event */
document.addEventListener('mousedown', function(element)
{
    if(window.isListning)
    {
        chrome.storage.local.get(['data'], async function(userActions) 
        {
            var loggedURL= element.target.baseURI;
            var tagName= element.target.tagName.toLowerCase();
            var xpath= await createXpath(element.target);
            var userAction = 
            { 
                stepId: 0, 
                userAction: 'click', 
                label: '', 
                targetedElement: '', 
                value: '' 
            }
            window.userActionsLocal= userActions.data;

            var label= '';
            var label1= element.target.className.baseVal;
            var label2= element.target.id;
            var label3= element.srcElement.ariaLabel;
            var label4= await getLabelName(element.target, tagName);
            
            if(label4)
            {
                label= label4;
            }
            else if(label3)
            {
                label= label3;
            }
            else if(label2)
            {
                label= label2;
            }
            else if(label1)
            {
                label= label1;
            }

            if((userActionsLocal== undefined) || (userActionsLocal.length== 0))
            {
                var initialAction= { stepId: 1, userAction: 'open url', label: '', targetedElement: '', value: loggedURL };
                userAction.stepId= 2;
                userAction.label= label;
                userAction.targetedElement= xpath;

                window.userActionsLocal= [];
                chrome.runtime.sendMessage({what: "userAction", data: initialAction});
                window.userActionsLocal.push(initialAction); 
            }
            else
            {
                userAction.stepId= window.userActionsLocal.length+ 1;
                userAction.label= label;
                userAction.targetedElement= xpath;
            }

            chrome.storage.local.get(['getData'], async function(Feild) 
            {
                if(Feild.getData)
                {
                    await getInsertedData();

                    userAction.stepId+= 1;
                    chrome.runtime.sendMessage({what: "userAction", data: userAction});
                    window.userActionsLocal.push(userAction);
                    chrome.storage.local.set({data: window.userActionsLocal});
                }
                else
                {
                    chrome.runtime.sendMessage({what: "userAction", data: userAction});
                    window.userActionsLocal.push(userAction);
                    chrome.storage.local.set({data: window.userActionsLocal});
                }

                if((tagName== 'input') || (tagName== 'textarea'))
                {
                    chrome.storage.local.set({getData: true});
                }
                else
                {
                    chrome.storage.local.set({getData: false});
                }

            });
        });
    }
});

/* get label data */
function getLabelName(element, tagName)
{
    if(tagName== 'input')
    {
        var type= element.type;

        if((type== 'button') || (type== 'submit'))
        {
            return getLabelbyWay(2, element);
        }
        else
        {
            return getLabelbyWay(1, element);
        }

    }
    if(tagName== 'textarea')
    {
        return getLabelbyWay(1, element);
    }
    else if((tagName== 'a') || (tagName== 'button'))
    {
        return getLabelbyWay(2, element);
    }
    else
    {
        return getLabelbyWay(2, element);
    }
}

function getLabelbyWay(way, element)
{
    if(way== 1)
    {
        var siblings=  element.parentNode.childNodes;

        for(let index= 0; index< siblings.length; index+= 1)
        {
            var sibling= siblings[index];;

            if(sibling.tagName.toLowerCase()== 'label')
            {
                return sibling.innerText;
            }
        }

        return null;
    }
    else
    {
        return element.innerText;
    }
}

/* create elements correct xpath */
function createXpath(targetedElement)
{
    if(targetedElement.id!== '')
    {
        return '//*[@id="'+targetedElement.id+'"]';
    }

    if(targetedElement=== document.body)
    {
        return "body";
    }

    var elementIndex= 0;
    var siblings=  targetedElement.parentNode.childNodes;

    for(let index= 0; index< siblings.length; index++)
    {
        var sibling= siblings[index];

        if(sibling=== targetedElement)
        {
            return createXpath(targetedElement.parentNode)+'/'+targetedElement.tagName.toLowerCase()+'['+(elementIndex+ 1)+']';
        }

        if((sibling.nodeType=== 1) && (sibling.tagName== targetedElement.tagName))
        {
            elementIndex+= 1;
        }
    }
}

/* get data from element */
async function getInsertedData()
{
    var totalUserActions= window.userActionsLocal.length;
    lastAction= window.userActionsLocal[totalUserActions- 1];

    if(lastAction.targetedElement=== "")
    {
        chrome.storage.local.set({getData: false});
    }
    else
    {
        element= getElementXpath(lastAction.targetedElement);

        var insertAction= 
        { 
            stepId: lastAction.stepId+ 1, 
            userAction: 'data insert', 
            label: lastAction.label, 
            targetedElement: lastAction.targetedElement, 
            value: element.value 
        };

        chrome.runtime.sendMessage({what: "userAction", data: insertAction});
        window.userActionsLocal.push(insertAction);
        chrome.storage.local.set({data: window.userActionsLocal});
        chrome.storage.local.set({getData: false});
    }
    
    
}

/* find element on xpath */
function getElementXpath(xpath)
{
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}