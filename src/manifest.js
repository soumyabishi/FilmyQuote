
module.exports = {
  name: 'FilmyQuote',
  version: '1.0.8',
  description: 'Famous bollywood movie dialogues in your new tab!',
  author: 'soumyabishi@outlook.com',
  manifest_version: 2,
  icons: { '16': 'icons/fq_16.png', '128': 'icons/fq_128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email'
  ],
  browser_action: {
    default_title: 'New tab - FilmyQuote',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [ 'js/inject.js' ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],

    chrome_url_overrides: {
        "newtab": "pages/app.html"
    },
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
