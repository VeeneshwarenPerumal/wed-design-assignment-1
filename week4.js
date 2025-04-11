const feeds = {
    "Mozilla Hacks": "https://hacks.mozilla.org/feed/",
    "CSS Tricks": "https://css-tricks.com/feed/",
    "Smashing Magazine": "https://www.smashingmagazine.com/feed/"
};

const select = document.createElement("select");
const feedContainer = document.createElement("div");

document.body.appendChild(select);
document.body.appendChild(feedContainer);

// Add options to dropdown
for (const name in feeds) {
    const option = document.createElement("option");
    option.value = feeds[name];
    option.textContent = name;
    select.appendChild(option);
}

select.addEventListener("change", () => {
    loadFeed(select.value);
});

function loadFeed(feedUrl) {
    const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            feedContainer.innerHTML = ""; // Clear previous content

            if (data.items && data.items.length > 0) {
                const list = document.createElement("ul");
                data.items.slice(0, 5).forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><br><small>${item.pubDate}</small>`;
                    list.appendChild(listItem);
                });
                feedContainer.appendChild(list);
            } else {
                feedContainer.textContent = "No feed items found.";
            }
        })
        .catch(err => {
            console.error("Feed loading error:", err);
            feedContainer.textContent = "Failed to load feed. Please try again.";
        });
}

// Load default feed on first load
loadFeed(select.value);

// Remove the <style> block from the JavaScript file. Move it to a CSS file or the HTML file.


