// Days of Week as Strings
const daysOfWeek = {
	1 : 'M',
	2 : 'T',
	3 : 'W',
	4 : 'T',
	5 : 'F',
	6 : 'S',
	7 : 'S'
};

const graphOptions = {
	chart      : {
		type       : 'bar',
		toolbar    : {
			show : false
		},
		dropShadow : {
			enabled : true,
			top     : 2,
			left    : 2,
			blur    : 4,
			opacity : 0.15
		}
	},
	dataLabels : {
		enabled : false
	},
	series     : [
		{
			name : 'Stress level'
			// This is the study time, set by views form db
			// data : [
			// 	30,
			// 	40,
			// 	70,
			// 	35,
			// 	50,
			// 	49,
			// 	90
			// ]
		}
	],
	xaxis      : {
		categories : daysOfWeek,
		labels     : {
			style : {
				fontSize : '14px'
			}
		}
	},
	yaxis      : {
		title : {
			text : 'Stress level'
		}
	},
	tooltip    : {
		enabled : false
	},
	states     : {
		hover : {
			filter : {
				type : 'none'
			}
		}
	}
};

export default graphOptions;
