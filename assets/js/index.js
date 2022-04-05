MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  }
});

document.addEventListener('DOMContentLoaded', function(event) {
	// Automatically open external links in a new tab
	for (let i = 0, links = document.links, linksLength = links.length; i < linksLength; i++) {
		if (links[i].hostname != window.location.hostname) {
			links[i].target = '_blank';
		}
	}
});
