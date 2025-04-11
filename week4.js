function loadFeed(feedUrl) {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl))
      .then(response => response.json())
      .then(data => {
        displayArticles(data.items);
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = '<p>Unable to load the feed. Please try again later.</p>';
      });
  }
  
  function displayArticles(articles) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
  
    if (!articles || articles.length === 0) {
      contentDiv.innerHTML = '<p>No articles found.</p>';
      return;
    }
  
    articles.forEach(article => {
      const articleEl = document.createElement('article');
      articleEl.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
      `;
      contentDiv.appendChild(articleEl);
    });
  }
  
  document.getElementById('feed-selector').addEventListener('change', function () {
    loadFeed(this.value);
  });
  
  // Load the default feed on page load
  loadFeed(document.getElementById('feed-selector').value);
  