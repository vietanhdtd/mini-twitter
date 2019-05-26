let tweetFeed = [];
let formattedText;

const inputTweet = document.getElementById('inputTweet')



const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        formerTweeted: false,
        hashtag: []
    }

    formatText(newTweet.text);
    newTweet.text = formattedText;
    tweetFeed.push(newTweet)
}

const updateTweetFeed = () => {
    let html = '', textnode, node
    tweetFeed.map(({isLiked, text}, i) => {
        textnode = `<li>
        ${text}<br>
        <a href="#" onclick="reTweet(${i})">Retweet</a>
        <a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "&#128148" : "&#10084"}</a>
        <a href="#" onclick="removeItem(${i})">Remove</a><br>
        <a href="#" id="${tweetFeed.hashtag}" >${tweetFeed[i].hashtag}</a><br>
        </li>`
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

const formatText = (text) => {
    formattedText = text.split(" ");
    console.log(formattedText);

    for (let i = 0; i < formattedText.length; i++) {
        if (formattedText[i].match(/\B\#\w\w+\b/g) !== null) {
            formattedText[i] = `<a href='#'>${formattedText[i]}</a>`
        } else if (formattedText[i].match(/\B\@\w\w+\b/g) !== null) {
            formattedText[i] = `<a href='#'>${formattedText[i]}</a>`
        }
    }
    return formattedText = formattedText.join(" ");
}

const displayRemainingCharacter = () => {
    document.getElementById('remainingCharacter').innerHTML = 140 - inputTweet.value.length;
}

const renderTweetFeed = () => {
    addNewTweet();
    updateTweetFeed();
}























document.getElementById('inputTweet').addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('tweetBtn').click();
    }
})