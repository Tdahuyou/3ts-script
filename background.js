function speakText(text) {
  console.log('call speakText', text)
  chrome.storage.sync.get(['voice'], ({ voice: v }) => {
    console.log('voice:', v)
    var utterance = new SpeechSynthesisUtterance(text);
    if (v) {
      utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === v)
    }
    window.speechSynthesis.speak(utterance);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "speak",
    title: "Speak",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "speak") {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      function: speakText,
      args: [info.selectionText]
    });
  }
});