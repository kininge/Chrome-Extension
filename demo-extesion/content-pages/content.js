
window.isListning= false;                                                                           //Global varible for user action listening status 
window.userActionsLocal= [];                                                                        //Global all user action storage list

/* check last status for listening user actions */
chrome.storage.local.get(['recordOrStop'], function(status)                                         //Get user action listning status from chrome local storage
{
    window.isListning= status.recordOrStop;                                                         //Get value from chrome storage and assign to gloabl variable
    console.log('intial: '+window.isListning);
});

/* Get request from backgroun.js file */
chrome.runtime.onMessage.addListener( async function(request, sender, sendResponse)                 //Listen message from across the chrome browser              
{
    window.isListning= request.message;                                                             //Get requested listening status and assign to gloable varible
    console.log('window.isListning: '+window.isListning);

    if(!window.isListning)                                                                          //When listening status gets to false
    {
        chrome.storage.local.get(['data'], function(userActions)                                    //Get all user action records from chrome loacl storage
        {
            window.userActionsLocal= userActions.data;                                              //Assign all user actions to gloable variable

            if(window.userActionsLocal.length> 0)                                                   //If any user actions present
            {
                chrome.storage.local.get(['getData'], async function(Feild)                         //Check any element remaing to collect data which user inserded Ex- input, textarea etc
                {
                    if(Feild.getData)                                                               //If element present to collect inserted data
                    {
                        await getInsertedData();                                                    //Collect inserted data
                        window.userActionsLocal= [];                                                //make empty gloable all user actions list
                    }
                    else
                    {
                        window.userActionsLocal= [];                                                //make empty gloable all user actions list
                    }
                }); 
            }
        });

    }
});

/* To listen mousedown or button click event */
document.addEventListener('mousedown', function(element)                                            //Listen 'Click' event done by user
{
    console.log('window.isListning: '+ window.isListning);                      

    if(window.isListning== true)                                                                    //Record actionn only if listening status is true
    {
        console.log('Recording this action');

        chrome.storage.local.get(['data'], async function(userActions)                              //Get all user action data from chrome local storage
        {
            window.userActionsLocal= userActions.data;                                              //Assign all user action data to global variable
            console.log('Before recording value');
            console.log(userActions.data);
            console.log(window.userActionsLocal);

            var loggedURL= element.target.baseURI;                                                  //Get web page URL
            var tagName= element.target.tagName.toLowerCase();                                      //Get tagname of user clicked element
            var xpath= await createXpath(element.target);                                           //Get Xpath of clicked element
            var userAction = 
            { 
                stepId: 0, 
                tagName: tagName,
                userAction: 'click', 
                label: '', 
                targetedElement: '', 
                value: '' 
            }
                           
            var label= '';                                                                          //User click element lable
            var label1= element.target.className.baseVal;                                           //User clicked element's class name
            var label2= element.target.id;                                                          //User clicked element's id
            var label3= element.srcElement.ariaLabel;                                               //User clicked element's text written in side ex- button name
            var label4= await getLabelName(element.target, tagName);                                //If user clicked element's is input or textarea and it have label tag then take that text
            
            if(label4)                                                                              //Priority 1: Take label text
            {
                label= label4.toString().trim();
            }
            else if(label3)                                                                         //Priority 2: Take element text
            {
                label= label3.toString().trim();
            }
            else if(label2)                                                                         //Priority 3: Take element id
            {
                label= label2.toString().trim();
            }
            else if(label1)                                                                         //Priority 4: Take element class name
            {
                label= label1.toString().trim();
            }

            if((userActionsLocal== undefined) || (userActionsLocal.length== 0))                     //If it is user's 1st clicked element
            {
                var initialAction= 
                { 
                    stepId: 1, 
                    tagName: '',
                    userAction: 'open url', 
                    label: '', 
                    targetedElement: '', 
                    value: loggedURL 
                };

                userAction.stepId= 2;                                                               //user actually clicked element's step id
                userAction.label= label;                                                            //user actually clicked element's label
                userAction.targetedElement= xpath;                                                  //user actually clicked element's xapth

                window.userActionsLocal= [];                                                        //When user 1st time install our chrome extensionn it might undefined so for safty set to empty list
                chrome.runtime.sendMessage({what: "userAction", data: initialAction});              //Send user action to background.js --> because popup.js can't hear directly
                window.userActionsLocal.push(initialAction);                                        //Added user action inn list
            }
            else                                                                                    //If it is not 1st click on user
            {
                userAction.stepId= window.userActionsLocal.length+ 1;                               //Step id is number of user action + 1        
                userAction.label= label;                                                            //User clicked element's label
                userAction.targetedElement= xpath;                                                  //user clicked element's xpath
            }

            chrome.storage.local.get(['getData'], async function(Feild)                             //Check is there any input or testarea element's inserted dat remaining to take
            {
                if(Feild.getData)                                                                   //If element's data remaining to take
                {
                    await getInsertedData();                                                        //get inserted data  
                }

                if((tagName== 'input') || (tagName== 'textarea'))                                   //If current clicked element is input or textarea the set avlue true so, e=we can take innsreted data on click element clicked
                {
                    chrome.storage.local.set({getData: true});

                    userAction.stepId+= 1;
                    
                    window.userActionsLocal.push(userAction);
                    chrome.storage.local.set({data: window.userActionsLocal});                      //New updated list of all user actions set to chrome storage
                }
                else
                {
                    chrome.storage.local.set({getData: false});

                    chrome.runtime.sendMessage({what: "userAction", data: userAction});             //Send user action to background.js becouase we can't send directly to popup.js
                    window.userActionsLocal.push(userAction);
                    chrome.storage.local.set({data: window.userActionsLocal});                      //New updated list of all user actions set to chrome storage
                }

                console.log(window.userActionsLocal);
            });
        });
    }
});

/* get label data */
function getLabelName(element, tagName)                                                             //take tag-name (uneccessory) and element to get label
{
    if(tagName== 'input')                                                                           //If element is input
    {
        var type= element.type;

        if((type== 'button') || (type== 'submit'))                                                  //If input type in button or submit it is not input it is button
        {
            return getLabelbyWay(2, element);
        }
        else
        {
            return getLabelbyWay(1, element);
        }

    }
    if(tagName== 'textarea')                                                                        //If element is textarea
    {
        return getLabelbyWay(1, element);
    }
    else if((tagName== 'a') || (tagName== 'button'))                                                //If eleemnt is link or button
    {
        return getLabelbyWay(2, element);
    }
    else                                                                                            //All other elements
    {
        return getLabelbyWay(2, element);
    }
}

/* Get exact label data */
function getLabelbyWay(way, element)
{
    if(way== 1)                                                                                     //Way 1: To get label tag data
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
    else                                                                                            //Way 2: To get whatever written inside the element
    {
        return element.innerText;
    }
}

/* create elements correct xpath */
function createXpath(targetedElement)
{
    if(targetedElement.id!== '')                                                                    //If clciked element's id present
    {
        /* That is format of Xpath */
        return '//*[@id="'+targetedElement.id+'"]';                                                 
    }

    if(targetedElement=== document.body)                                                            //If user reach or clicked on boty element
    {
        return "body";
    }

    var elementIndex= 0;                                                                            //Element index
    var siblings=  targetedElement.parentNode.childNodes;                                           //Get all sibling elements list to find out index of our element

    for(let index= 0; index< siblings.length; index++)
    {
        var sibling= siblings[index];                                                               //siblig element

        if(sibling=== targetedElement)                                                              //If sibling element is our user clicked element then create xpath with element index
        {
            return createXpath(targetedElement.parentNode)+'/'+targetedElement.tagName.toLowerCase()+'['+(elementIndex+ 1)+']';
        }

        if((sibling.nodeType=== 1) && (sibling.tagName== targetedElement.tagName))                  //If siblic element diffrent and tag name is name then increate element index
        {
            elementIndex+= 1;
        }
    }
}

/* get data from element */
async function getInsertedData()
{
    var totalUserActions= window.userActionsLocal.length;                                           //Get all user action from global list
    lastAction= window.userActionsLocal[totalUserActions- 1];                                       //Get last user action present in list -- > to get inserted data into that element

    if(lastAction.targetedElement=== "")                                                            //If we can't local that element
    {
        chrome.storage.local.set({getData: false});                                                 //Set get inserted dat status to false
    }
    else
    {
        element= getElementXpath(window.userActionsLocal[totalUserActions- 1].targetedElement);     //Search element because we neet new copy of element which have inserted dats. 

        // var insertAction= 
        // { 
        //     stepId: lastAction.stepId+ 1, 
        //     userAction: 'data insert', 
        //     label: lastAction.label, 
        //     targetedElement: lastAction.targetedElement, 
        //     value: element.value                                                                    
        // };

        window.userActionsLocal[totalUserActions- 1].value= element.value                           //Get inserted value
        lastAction= window.userActionsLocal[totalUserActions- 1];                                   //Get updated last user action present in list

        chrome.runtime.sendMessage({what: "userAction", data: lastAction});                         //Send user action to background.js --> because popup.js can't hear directly
        chrome.storage.local.set({data: window.userActionsLocal});                                  //Set all user actions to chrome storage
        chrome.storage.local.set({getData: false});                                                 //Set get insert data satus to false 
    }
    
    
}

/* find element on give xpath */
function getElementXpath(xpath)
{
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}