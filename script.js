let tweetFeed = [];
let formattedText;

const inputTweet = document.getElementById('inputTweet')


const addNewTweet = () => {
    const newTweet = {
        isLiked: false,
        text: inputTweet.value,
        author: "",
        createAt: new Date(),
        hashtag: [],
        reTweets: [{
            isRetweeted: false,
            isLiked: false,
            text: inputTweet.value,
            author: '',
            createAt: new Date(),
        }]
    }
    formatText(newTweet.text);
    newTweet.text = formattedText;
    tweetFeed.unshift(newTweet);
}

const updateTweetFeed = () => {
    let html = '', textnode, node;
    tweetFeed.sort();
    tweetFeed.map(({reTweets, text}, i) => {
        textnode = `<li>
        <div class="card w-75">
            <div class="card-body">
                <h5 class="card-title">User Name <small class="text-muted"> @username - 3 mins ago</small></h5>
                <p class="card-text">${text}</p>
                <a href="#" onclick="reTweetToggle(${i})">Retweet</a>
                <a href="#" onclick="removeItem(${i})">Remove</a><br>
                <a href="#" id="${tweetFeed.hashtag}" >${tweetFeed[i].hashtag}</a><br>
                <a href="#" onclick="toggleLike(${i})">${tweetFeed[i].isLiked ? "&#128148" : "&#10084"}</a>
                <ul id="index${i}" class="${reTweets.isRetweeted ? "d-block" : "d-none"}">
                    <li>${text}<a href="#" onclick="toggleLikeReTweet(${i})">${reTweets.isLiked ? "&#128148" : "&#10084"}</a></li>
                </ul>
                </div>
            </div>
        </li>`
        node = html += textnode;
        document.getElementById('tweetFeed').innerHTML = node;
        inputTweet.value = '';
        document.getElementById('remainingCharacter').innerHTML = '140/140';
    })
}

// const reTweet = i => {
//     tweetFeed.splice(i + 1, 0, tweetFeed[i])
//     updateTweetFeed()
// }

const reTweetToggle = idx => {
    tweetFeed[idx].reTweets.isRetweeted = !tweetFeed[idx].reTweets.isRetweeted
    updateTweetFeed()
}

const toggleLikeReTweet = idx => {
    tweetFeed[idx].reTweets.isLiked = !tweetFeed[idx].reTweets.isLiked
    updateTweetFeed()
}

const toggleLike = i => {
    tweetFeed[i].isLiked = !tweetFeed[i].isLiked;
    updateTweetFeed()
}

const deleteTweet = idx => {
    tweetFeed = tweetFeed.filter((_, i) => i !== idx)
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
    document.getElementById('remainingCharacter').innerHTML = (140 - inputTweet.value.length) + "/140"
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