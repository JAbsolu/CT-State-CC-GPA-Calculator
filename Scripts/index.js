// GET ALL COURSE SECTION FIELDS
let course = document.querySelectorAll(".course");
let gradeElements = document.querySelectorAll('select[name="grade"]');
let creditsElements = document.querySelectorAll('.gpaCredits');
let existingCreds = document.querySelector(".existing-credits");
let existingGpa = document.querySelector(".existing-gpa");
const currentGpa = document.getElementsByClassName("current-gpa");
const gpaScore = document.querySelector(".gpa-score");
const enteredExistingCreds = document.getElementsByClassName("current-total-credits");
const calculate = document.querySelector(".calculate");
const classError = document.querySelector(".missing-class-error");


document.addEventListener('DOMContentLoaded', function() {
    // PREVENT FORM FROM RELAODING
    const form = document.querySelector('#prevent-default');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    })
    // ADD NEW CLASS ROW
    let rowCount = 5
    const addRow = document.querySelector('.btn-add-row');
    const addClassRow = () => { 
        const gpaFormDiv = document.querySelector('.gpaFormDiv');
        const newRow = ` 
        <div class="addCourseRow"> 
            <label for="class">Class ${rowCount}</label>
            <input type="text" name="class" placeholder="Course">
            <label for="grade">Grade</label>
            <select id="grade" name="grade">
                <option value="4">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+-</option>
                <option value="1">D</option>
                <option value="0.7">D-</option>
                <option value="0">F</option>
            </select>
            <span>
                <label for="credits">Credits</label>
                <input type="text" name="credits" class="gpaCredits">
            </span>
        </div>
        <br/>
        `
        rowCount += 1
        gpaFormDiv.innerHTML += newRow

        console.log("class row added")
    }
    addRow.addEventListener('click', addClassRow); 

    // Add an event listener to the button
    calculate.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Input error control
      for (let i = 0; i < course.length; i+=1) {
        let credValue = creditsElements[i].value
        course[i].value === "" || credValue === "" ?  
        classError.classList.remove('d-none') //if both course and credits onpy empty show err msf
        : classError.classList.add('d-none') //else hide error msg
      }
  
      let enteredExistingCreds = existingCreds.value || 0; //check if there is value else defaul val is 0
      let enteredExistingGpa = existingGpa.value || 0;
      //get the total amount of points the student already has excluding current semester points
      let totalExistingPoints = parseFloat(enteredExistingCreds * enteredExistingGpa);

      let totalCredits = parseFloat(enteredExistingCreds); //total credits including inputed current creds
      let totalPoints = parseFloat(totalExistingPoints); //total poitns including inputed current points
        
      // Iterate through the grade elements
      gradeElements.forEach(function(gradeElement, index) {
        var gradeValue = parseFloat(gradeElement.value);
        var creditsValue = parseFloat(creditsElements[index].value);
  
        if (!isNaN(gradeValue) && !isNaN(creditsValue)) {
          totalPoints += gradeValue * creditsValue
          totalCredits += creditsValue;
        }
      });


      //Check t0 see if GPA is a number, if not set new score to be 0.00
      let newGPA = parseFloat(totalPoints / totalCredits).toFixed(2)
      if (!isNaN(newGPA)) {
        gpaScore.textContent = newGPA;
      } else {
        gpaScore.textContent = parseFloat(0).toFixed(2)
      }

      localStorage.setItem("semester GPA", gpaScore.textContent)

  
      if (totalCredits > 0) {
        var gpa = totalPoints / totalCredits;
        console.log('Your GPA is:', gpa);
      } else {
        console.log('No valid grades or credits provided.');
      }
    });


    let savedScore = localStorage.getItem('semester GPA');

    if (isNaN(savedScore)) {
      gpaScore.textContent = parseFloat(0).toFixed(2);
    } else {
      gpaScore.textContent = parseFloat(savedScore).toFixed(2);
    }
});