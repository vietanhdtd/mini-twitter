let tweetFeed = [];


const inputTweet = document.getElementById('inputTweet')



const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        formerTweeted: false
    }
    tweetFeed.push(newTweet)
}

const updateTweetFeed = () => {
    let html = '', textnode, node
    tweetFeed.map(({isLiked, text}, i) => {
        textnode = `<li>${text}<a href="#" onclick="reTweet(${i})">Retweet</a><a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "unlike" : "like"}</a><a href="#" onclick="removeItem(${i})">Remove</a></li>`
        node = html += textnode
        document.getElementById('tweetFeed').innerHTML = node
        inputTweet.value = ''
    })
}

const reTweet = i => {
    tweetFeed.splice(i + 1, 0, tweetFeed[i])
    updateTweetFeed()
}

const toggleLike = i => {
    tweetFeed[i].isLiked = !tweetFeed[i].isLiked;
    updateTweetFeed()
}

const removeItem = i => {
    tweetFeed.splice(i, 1);
    updateTweetFeed();
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