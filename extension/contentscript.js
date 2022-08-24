(async () => {
  setInterval(() => {
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
    for (const tweet of tweets) {
      const markAsBotButton = tweet.querySelector('div[aria-label="Mark as Bot"]');
      if (markAsBotButton) {
        continue;
      }
      // This will get the likes/(q)rts as well as the interaction buttons
      const groups = tweet.querySelectorAll('div[role=group]');
      const interactionButtons = groups[groups.length - 1];
      const newButton = document.createElement('div');
      newButton.className = "css-1dbjc4n r-18u37iz r-1h0z5md";
      newButton.addEventListener('click', () => {
        const usernameGroup = tweet.querySelector('div[data-testid=User-Names]');
        const handle = usernameGroup.querySelectorAll('a[role=link]')[1].innerText.replace('/', '');
        const tweetTextParts = Array.from(tweet.querySelectorAll('div[data-testid=tweetText] > span'));
        const joinedTweetText = tweetTextParts.map(el => el.innerText).join('');
        const tweetHref = tweet.querySelector('a[href*=status]').getAttribute('href');
        const reportObject = {
          "tweet": {
            "content": joinedTweetText,
            "href": tweetHref,
            "author": {
              "handle": handle
            }
          }
        }
        console.log(reportObject);
        fetch("https://api.github.com/repos/oldcomputer2007/trols/issues", {
          body: JSON.stringify({"title":`twitter: ${handle}`,"body":`\`\`\`${JSON.stringify(reportObject)}\`\`\``}),
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: "token ",
          },
          method: "POST"
        }).then(() => {
          interactionButtons.removeChild(newButton);
        })
      });

      newButton.innerHTML = `
      <div aria-label="Mark as Bot" role="button" tabindex="0"
        class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="markasbot">
        <div dir="ltr"
          class="css-901oao r-1awozwy r-6koalj r-37j5jr r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0"
          style="color: rgb(113, 118, 123);">
          <div class="css-1dbjc4n r-xoduu5">
            <div
              class="css-1dbjc4n r-1krxqcr r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg">
            </div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
          </svg>
          </div>
        </div>
      </div>`;
      interactionButtons.appendChild(newButton);
    }
  }, 100);
})();
