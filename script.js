let tweetFeed = [];

const inputTweet = document.getElementById('inputTweet')


const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        author: '',
        createAt: new Date(),
        reTweets: [{
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
        text
    }, i) => {
        textnode = `<li>${text}<a href="#" onclick="reTweetToggle(${i})">Retweet</a>
    <a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "unlike" : "like"}</a>
    <ul id="index${i}"></ul>
    </li>`
        node = html += textnode
        document.getElementById('tweetFeed').innerHTML = node
        inputTweet.value = ''
    })
    // console.log(tweetFeed)
    // reTweet()
}

const reTweetToggle = idx => {
    let html = '',
        textnode, node
    tweetFeed[idx].reTweets.map((_,i) => {
        textnode = `<li>${tweetFeed[idx].reTweets[i].text}<a href="#" onclick="toggleLikeReTweet(${i})">${tweetFeed[idx].reTweets[i].isLiked ? "unlike" : "like"}</a></li>`
    node = html += textnode
    document.getElementById(`index${idx}`).innerHTML = node
    })
    console.log( tweetFeed[idx].reTweets)
}



const toggleLike = (i) => {
    tweetFeed[i].isLiked = !tweetFeed[i].isLiked;
    updateTweetFeed()
}

const displayRemainingCharacter = () => {
    document.getElementById('remainingCharacter').innerHTML = 140 - inputTweet.value.length
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