let tweetFeed = [];
let inputHashtag = []


const inputTweet = document.getElementById('inputTweet')



const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        formerTweeted: false,
        hashtag: []
    }
    getHashtagFromInput(newTweet.text)
    newTweet.hashtag.concat(inputHashtag)
    tweetFeed.push(newTweet)
}

const updateTweetFeed = () => {
    let html = '', textnode, node
    tweetFeed.map(({isLiked, text}, i) => {
        textnode = `<li>
        ${text}
        <a href="#" onclick="reTweet(${i})">Retweet</a>
        <a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "unlike" : "like"}</a>
        <a href="#" onclick="removeItem(${i})">Remove</a>
        <ul>Hashtag:
        <li><a href="#"><input type="checkbox">#adopt<br></a></li>
        <li><a href="#"><input type="checkbox">#improvise<br></a></li>
        <li><a href="#"><input type="checkbox">#overcum<br></a></li>
        <li><a href="#"><input type="checkbox">#heyaheya<br></a></li>
        </ul></li>`
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

// count hashtag
function countHashtag(original) {
    return array.reduce((countsMap, item) => countsMap.set(item, countsMap.get(item) + 1 || 1), new Map())
}

// get hashtag from text input
function getHashtagFromInput(searchText) {
    var regexp = /\B\#\w\w+\b/g
    inputHashtag = searchText.match(regexp);
    if (inputHashtag) {
        // console.log(inputHashtag);
    } else {
        return false;
    }
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