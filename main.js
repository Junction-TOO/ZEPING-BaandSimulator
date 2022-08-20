const topLatitude = 35.197469;
const bottomLatitude = 35.19521;
const leftLongitude = 129.213777;
const rightLongitude = 129.216863;
const latitudeValue = topLatitude - bottomLatitude;
const longitudeValue = rightLongitude - leftLongitude;

const topY = 11;
const bottomY = 63;
const leftX = 5;
const rightX = 86;

let myLocX = null;
let myLocY = null;
let myLatitude = null;
let myLongitude = null;
let _player = App.player;

let userId = null;
let kid = App.loadSpritesheet("kid.png");

App.onJoinPlayer.Add((player) => {
	if (player.customData) userId = JSON.parse(player.customData)[0];
	else {
		App.sayToAll("유저ID 를 입력해주세요.");
		App.onSay.add((player, text) => {
			if (text.length == 7) {
				userId = text;
			} else App.sayToAll("7자리 숫자를 입력해주세요");
		});
	}
	player.name = "Kid with Band";
	player.sprite = kid;
	player.sendUpdated();
	setInterval(() => {
		myLocX = player.tileX;
		myLocY = player.tileY;
		myLatitude =
			topLatitude -
			(((latitudeValue * 1000000) / (bottomY - topY)) * (myLocY - topY)) /
				1000000;
		myLongitude =
			leftLongitude +
			(((longitudeValue * 1000000) / (rightX - leftX)) * (myLocX - leftX)) /
				1000000;
		if (userId) {
			App.httpGet(
				`https://api1.too.gold/gps?type=child&userId=${userId}&latitude=${myLatitude}&longitude=${myLongitude}`,
				null,
				(res) => {
					// App.sayToAll(res);
				}
			);
		}
	}, 100);
});
