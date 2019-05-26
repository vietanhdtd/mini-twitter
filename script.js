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
    tweetFeed.push(newTweet)
}


const updateTweetFeed = () => {
    let html = '',
        textnode, node
    tweetFeed.map(({
        reTweets,
        text
    }, i) => {
        textnode =
            `<li>
    <div class="card w-75">
        <div class="card-body">
            <h5 class="card-title">User Name <small class="text-muted"> @username - 3 mins ago</small></h5>
            <p class="card-text">${text}</p>
            <a href="#" onclick="reTweetToggle(${i})">Retweet</a>
            <a href="#" onclick="deleteTweet(${i})">Delete</a>
            <a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "unlike" : "like"}</a>
            <ul id="index${i}" class="${reTweets.isRetweeted ? "d-block" : "d-none"}">
                <li>${text}<a href="#" onclick="toggleLikeReTweet(${i})">${reTweets.isLiked ? "unlike" : "like"}</a></li>
            </ul>
         </div>
         <img src="img/tweet-img.jpg" class="card-img-top" alt="pepe the frog">
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