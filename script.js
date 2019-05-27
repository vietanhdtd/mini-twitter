
let tweetFeed = [];

const inputTweet = document.getElementById('inputTweet')


const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        author: '',
        createAt: new Date(),
        reTweets: [{
            isRetweeted: false,
            isLiked: false,
            text: inputTweet.value,
            author: '',
            createAt: new Date(),
        }]
    }
    tweetFeed.unshift(newTweet)
}


const updateTweetFeed = () => {
    let html = '',
        textnode, node
    tweetFeed.map(({
        reTweets,
        text
    }, i) => {
        textnode =
            `<li class="tweet-card">
    <div class="tweet-content">
      <div class="tweet-header">
        <span class="fullname">
          <strong>Pepe The Forg</strong>
        </span>
        <span class="username">@hoangvy.thefrog</span>
        <span class="tweet-time">- May 28</span>
      </div>
      <a>
        <img class="tweet-card-avatar" src="/img/profile-pic.jpg" alt="">
      </a>
      <div class="tweet-text">
        <p class="" lang="es" data-aria-label-part="0">${text}
        </p>
      </div>
      <div class="tweet-footer">
        <a class="tweet-footer-btn">
          <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
        </a>
        <a class="tweet-footer-btn"  onclick="reTweetToggle(${i})">
          <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
        </a>
        <a class="tweet-footer-btn" href="#" onclick="toggleLike(${i})">
            ${tweetFeed[i].isLiked ? `<i class="fas fa-heart"></i>` : `<i class="far fa-heart"></i>`}<span> 202</span>
        </a>
        <a class="tweet-footer-btn" href="#" onclick="deleteTweet(${i})">
            <i class="fas fa-trash"></i><span> </span>
        </a>
        <ul id="index${i}" class="${reTweets.isRetweeted ? "d-block" : "d-none"}" style="list-style-type:none;">
                <li>${text} <a href="#" onclick="toggleLikeReTweet(${i})"> ${reTweets.isLiked ? `<i class="fas fa-heart"></i>` : `<i class="far fa-heart"></i>`}</a></li>
            </ul>
      </div>
    </div>
  </li>`
        node = html += textnode
        document.getElementById('tweetFeed').innerHTML = node
        inputTweet.value = ''
        document.getElementById('remainingCharacter').innerHTML = '140/140'
    })
}

const reTweetToggle = idx => {
    tweetFeed[idx].reTweets.isRetweeted = !tweetFeed[idx].reTweets.isRetweeted
    updateTweetFeed()
}

const toggleLikeReTweet = idx => {
    tweetFeed[idx].reTweets.isLiked = !tweetFeed[idx].reTweets.isLiked
    updateTweetFeed()
}

const toggleLike = (idx) => {
    tweetFeed[idx].isLiked = !tweetFeed[idx].isLiked;
    updateTweetFeed()
}

const deleteTweet = idx => {
    tweetFeed = tweetFeed.filter((_, i) => i !== idx)
    updateTweetFeed()
}

const displayRemainingCharacter = () => {
    document.getElementById('remainingCharacter').innerHTML = (140 - inputTweet.value.length) + "/140"
}


const renderTweetFeed = () => {
    addNewTweet()
    updateTweetFeed()
}


document.getElementById('inputTweet').addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('tweetBtn').click();
    }
})