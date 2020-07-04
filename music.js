const $ = require('jquery')
const { v4: uuidv4 } = require('uuid')

fileSelected = $("#file-selected")
musicBody = $("#music-body")
plusButton = $("#plus-music")
audioButton = $("#audio-play").get(0)
songPlaying = $("#song-playing")
songPlayPause = $("#btn-to-play")
songPlayPauseSpan = $("#btn-to-play span")

let playing = false
let currentIndex = 0
let timer = undefined
let songData = { path: [], musicIds: [] }

plusButton.get(0).onclick = function () {
  fileSelected.click()
}

fileSelected.get(0).onchange = function () {
  let contents = fileSelected.get(0).files

  for (let i = 0; i < contents.length; i++) {
    const musicId = uuidv4()

    songData.path[i] = contents[i].path
    songData.musicIds[i] = musicId

    let row_ = `
        <tr id="${musicId}"> 
        <td> ${contents[i].path} </td> 
        </tr>
        `
    musicBody.append(row_)
    $("#" + musicId).on("click", function () {
      playSound(i)
    })
  }
}

songPlayPause.get(0).onclick = function () {
  updatePlayButton()
}

$("#btn-to-previous").get(0).onclick = function () {
  currentIndex--
  if (currentIndex < 0)
    currentIndex = songData.path.length - 1
  playSound(currentIndex)
}

$("#btn-to-next").get(0).onclick = function () {
  currentIndex++
  if (currentIndex >= songData.path.length)
    currentIndex = 0
  playSound(currentIndex)
}

$("#btn-clear-playlist").get(0).onclick = function () {
  clearPlayList()
}


function updatePlayButton() {
  if (playing) {
    playing = false
    audioButton.pause()
    songPlayPauseSpan.removeClass("icon-pause")
    songPlayPauseSpan.addClass("icon-play")
    clearInterval(timer)
  } else {
    playing = true
    audioButton.play()
    songPlayPauseSpan.removeClass("icon-play")
    songPlayPauseSpan.addClass("icon-pause")
    timer = setInterval(updateTime, 1000)
  }
}

function playSound(index) {
  audioButton.src = songData.path[index]
  audioButton.load()
  audioButton.play()
  songPlaying.text(songData.path[index])
  playing = true
  songPlayPauseSpan.removeClass("icon-play")
  songPlayPauseSpan.addClass("icon-pause")
  currentIndex = index
  timer = setInterval(updateTime, 1000)
}

function updateTime() {
  $("#time-left").text(secondsToTime(audioButton.currentTime))
  $("#total-time").text(secondsToTime(audioButton.duration))

  if (audioButton.currentTime >= audioButton.duration) {
    currentIndex++
    if (currentIndex >= songData.path.length)
      currentIndex = 0
    playSound(currentIndex)
  }
}

function secondsToTime(t) {
  return padZero(parseInt((t / (60)) % 60)) + ":" + padZero(parseInt((t) % 60));
}

function padZero(v) {
  return (v < 10) ? "0" + v : v;
}

function clearPlayList() {
  songData.path = []
  songData.musicIds = []
  $('#music-body').html('')
  currentIndex = 0
  clearInterval(timer)

  playing = false
  updatePlayButton()
  songPlaying.text('')

  $("#time-left").text("00:00")
  $("#total-time").text("00:00")
  audioButton.pause()
  audioButton.src = ''
}
