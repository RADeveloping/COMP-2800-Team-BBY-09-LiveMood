let questions = [];
let ansWords = [[],[]];
readDB();
document.getElementById("saveButton").addEventListener("click", save);

function readDB(){
    db.collection("survey").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            questions.push(doc.data()["question"]);
            ansWords[0].push(doc.data()["minWord"]);
            ansWords[1].push(doc.data()["maxWord"]);
        });
        loadPage();
    });
}

function loadPage(){
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];

        // Question text
        let questionPara = document.createElement("p");
        questionPara.className = "text-center";
        questionPara.textContent = q;

        // Slider div
        let sliderDiv = document.createElement("DIV");
        sliderDiv.className = "form-control-range mb-4 sliderCont";

        // Slider
        let slider = document.createElement("INPUT");
        slider.className = "form-control-range slider";
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0");
        slider.setAttribute("max", "100");
        slider.setAttribute("value", "50");
        slider.setAttribute("step", "10");
        
        let textMin = document.createElement("p");
        textMin.className = "descWord";
        textMin.innerText = ansWords[0][i];

        let textMax = document.createElement("p");
        textMax.className = "descWord";
        textMax.innerText = ansWords[1][i];

        sliderDiv.appendChild(textMin);
        sliderDiv.appendChild(slider);
        sliderDiv.appendChild(textMax);

        // Main container
        let qDiv = document.createElement("DIV");
        qDiv.className = "q";
        qDiv.appendChild(questionPara);
        qDiv.appendChild(sliderDiv);

        $(".qContainer").append(qDiv);
    };
}

function save(){
    
    let sum = 0;
    let userId = firebase.auth().currentUser.uid;
    sliderList = document.getElementsByClassName("slider");

    Array.from(sliderList).forEach(slider => {
        sum += parseInt(slider.value);
    });

    let score = sum/sliderList.length;
    console.log(userId +":" + score);
    db.collection("surveyTaken").add({
        userId: userId,
        score: score,
        
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
