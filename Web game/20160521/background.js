chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('game.html', {
        'outerBounds': {
            'width': 600,
            'height': 450
        }
    });
});
