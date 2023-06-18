// popup.js
const selectVoice = document.getElementById('selectVoice')

window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = voices[i].name;
    selectVoice.appendChild(option);
  }

  selectVoice.value = voices[0].name

  chrome.storage.sync.get(['voice'], (result) => {
    const v = result.voice
    if (v) selectVoice.value = v
  });
}

selectVoice.addEventListener('change', () => {
  chrome.storage.sync.set({
    voice: selectVoice.value
  })
})