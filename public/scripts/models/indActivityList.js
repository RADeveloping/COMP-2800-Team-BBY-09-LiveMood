// const individualActivitiesArr = [
// 	{
// 		name   : 'Helplines',
// 		rating : 1,
// 		link   : 'https://www.ctvnews.ca/health/mental-health-care-in-canada-where-to-find-help-1.3767445',
// 		info   : 'It looks like you’re have a hard time. Help is always here for you.'
// 	},
// 	{
// 		name   : 'Walk',
// 		rating : 2,
// 		link   : null,
// 		info   : 'It looks like you’re have a hard time. How about getting some fresh air.'
// 	},
// 	{
// 		name   : 'Dance',
// 		rating : 3,
// 		link   : null,
// 		info   : "Feeling a bit down? Dance like nobody's watching."
// 	},
// 	{
// 		name   : 'Craft',
// 		rating : 4,
// 		link   : null,
// 		info   : 'Feeling a bit down? Craft a gift for someone you love.'
// 	},
// 	{
// 		name   : 'Gratitude List',
// 		rating : 5,
// 		link   : null,
// 		info   : 'Feeling neutral? Try writing a gratitude list. '
// 	},
// 	{
// 		name   : 'Meditate',
// 		rating : 6,
// 		link   : null,
// 		info   : 'Looks like your doing ok. Try meditation.'
// 	},
// 	{
// 		name   : 'Healthy Cooking',
// 		rating : 7,
// 		link   : null,
// 		info   : 'Looks like you’re doing well. Try cooking a healthy meal.'
// 	},
// 	{
// 		name   : 'Play a Game',
// 		rating : 7,
// 		link   : null,
// 		info   : 'Feeling good? Reward yourself with an online game.'
// 	},
// 	{
// 		name   : 'Learn a new Skill',
// 		rating : 9,
// 		link   : null,
// 		info   : 'Look’s like you’re felling really good. Try learning a new skill.'
// 	},
// 	{
// 		name   : 'Help a Friend',
// 		rating : 10,
// 		link   : null,
// 		info   : 'You’re doing amazing. Call a friend that might be struggling.'
// 	}
// ];

function addArrToFirebase() {
	// for (i = 0; i < individualActivitiesArr.length; i++) {
	console.log('hi');
	db
		.collection('individualActivities')
		.doc()
		.set({
			name   : 'Help a Friend',
			rating : 10,
			link   : null,
			info   : 'You’re doing amazing. Call a friend that might be struggling.'
			// name   : individualActivitiesArr[i].name.value,
			// rating : individualActivitiesArr[i].rating.value,
			// info   : individualActivitiesArr[i].info.value,
			// link   : individualActivitiesArr[i].link.value
		})
		.catch(function(error) {
			console.error('Error adding document: ', error);
		});
	console.log('hi');
}
// }

addArrToFirebase();
