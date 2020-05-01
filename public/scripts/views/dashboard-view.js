import graphOptions from '../config/graphConfig.js';
const indMoodArr = [ 5, 8, 6, 4, 7, 3, 9 ];
const dashboardViews = {
	//*****************************************************************************
	// Renders The users first name in the dashboard page heading.
	//
	// Params: Logged in user data
	//*****************************************************************************
	renderHeading : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById('page-heading__username').innerText = firstName;
	},

	//*****************************************************************************
	// Renders Graph or Welcome message on Dashboard page.
	//
	// Params: Array of sessions
	//*****************************************************************************
	renderGraph   : function(indMoodArr) {
		// Gets required HTML elements
		const graphElement = document.querySelector('#chart');
		const graphCard = document.querySelector('.graph__card');
		const graphSpinner = document.querySelector('#graph--spinner');

		// If there has been no study sessions in the last 7 minutes, displays a welcome message for the user. Otherwise graph is rendered.
		if (totalMinutes === 0) {
			// Adds Welcome message for new users
			graphCard.innerHTML = `<div class="graph__card--welcome">
			<h2 class="about__heading">Welcome to LiveMood</h2>
			<div class="about__content">
                <p>LiveMood is an app to track your stress level during the global pandemic. 
                As well as see the average stress level for groups you're in</p>
				<p>To rate your mood, click the button below. </p>
				<p>Or, press the timer button at the bottom of the page to start
					timing a study session now!</p>
			</div>
			<a href="./course-add.html" class="add-course-link btn" role="button">Add New Course</a>
		</div>`;
		} else {
			// Sets graph data to be sorted session array
			graphOptions.series[0].data = times;
			// Makes a new chart object
			const chart = new ApexCharts(graphElement, graphOptions);
			// Hides Graph Loading Spinner
			graphSpinner.style.display = 'none';
			// calls render method of chart object, displays chart
			chart.render();
		}
	}
};

export default dashboardViews;
