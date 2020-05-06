function getActivityResult() {
	db.collection('individualActivities').get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			console.log(doc.data());
		});
	});
}
getActivityResult();
