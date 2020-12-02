
chrome.contextMenus.create
(
    {
        "id": "getXpth",
        "title": "Get Xpath",
        "contexts": ["all"]
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab)
{
    alert(info.toString());
});