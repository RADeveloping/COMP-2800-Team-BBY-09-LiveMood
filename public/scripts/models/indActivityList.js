const individualActivitiesArr = [
	{
		name   : 'Helplines',
		rating : 1,
		link   : 'https://www.ctvnews.ca/health/mental-health-care-in-canada-where-to-find-help-1.3767445',
		info   : 'It looks like you’re have a hard time. Help is always here for you.',
		image  : 'images/help.png'
	},
	{
		name   : 'Go for a Walk',
		rating : 2,
		link   : 'https://www.health.harvard.edu/staying-healthy/walking-your-steps-to-health',
		info   : 'It looks like you’re have a hard time. How about getting some fresh air.',
		image  : 'images/walk.jpg'
	},
	{
		name   : 'Dance',
		rating : 3,
		link   : 'https://www.healthline.com/health/fitness-exercise/benefits-of-dance',
		info   : "Feeling a bit down? Dance like nobody's watching.",
		image  : 'images/dance.jpg'
	},
	{
		name   : 'Craft',
		rating : 4,
		link   : 'https://www.mybluprint.com/article/easy-card-making-ideas-that-take-30-minutes-or-less',
		info   : 'Feeling a bit down? Make card for someone you care about.',
		image  : 'images/card.png'
	},
	{
		name   : 'Gratitude List',
		rating : 5,
		link   : 'https://www.wikihow.com/Make-a-Gratitude-List',
		info   : 'Feeling neutral? Try writing a gratitude list.',
		image  : 'images/gratitude.jpg'
	},
	{
		name   : 'Meditate',
		rating : 6,
		link   : 'https://www.headspace.com/meditation/meditation-for-beginners',
		info   : 'Looks like your doing ok. Try meditation.',
		image  : 'images/meditation.jpg'
	},
	{
		name   : 'Healthy Cooking',
		rating : 7,
		link   : 'https://www.foodnetwork.com/healthy/packages/healthy-every-week',
		info   : 'Looks like you’re doing well. Try cooking a healthy meal.',
		image  : 'images/food.jpg'
	},
	{
		name   : 'Play a Game',
		rating : 8,
		link   : 'https://www.pcgamer.com/best-browser-games/',
		info   : 'Feeling good? Reward yourself with an online game.',
		image  : 'images/game.jpg'
	},
	{
		name   : 'Learn a new Skill',
		rating : 9,
		link   : 'https://www.skillshare.com/',
		info   : 'Look’s like you’re felling really good. Try learning a new skill.',
		image  : 'images/learn.jpg'
	},
	{
		name   : 'Help a Friend',
		rating : 10,
		link   : 'http://health.sunnybrook.ca/covid-19-coronavirus/ways-to-stay-social-despite-the-distance/',
		info   : 'You’re doing amazing. Call a friend that might be struggling.',
		image  : 'images/call.jpg'
	}
];

// document.getElementById('test').onclick = addArrToFirebase;

function addArrToFirebase() {
	for (let i = 0; i < individualActivitiesArr.length; i++) {
		console.log('hi');
		db
			.collection('individualActivities')
			.add({
				name   : individualActivitiesArr[i].name,
				rating : individualActivitiesArr[i].rating,
				info   : individualActivitiesArr[i].info,
				link   : individualActivitiesArr[i].link
			})
			.then(function(docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	}
}
