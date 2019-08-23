/* globals util */

this.intents.read = (function() {
  this.intentRunner.registerIntent({
    name: "read",
    examples: ["read this tab"],
    async run(desc) {
      // FIXME: this can fail, we should guard against that and show error:
      await browser.tabs.toggleReaderMode();
      // FIXME: toggleReaderMode just returns immediately so we have to wait to get this to work
      // Ideally it would give an error or something if it was attached to the wrong kind of tab
      await util.sleep(1000);
      await browser.tabs.executeScript({
        runAt: "document_end",
        file: "/intents/read/startNarration.js",
      });
      browser.runtime.sendMessage({
        type: "closePopup",
        sender: "read",
      });
    },
  });
})();