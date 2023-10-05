// GET ALL COURSE SECTION FIELDS
let course = document.querySelectorAll(".course");
let gradeElements = document.querySelectorAll('.grade');
let creditsElements = document.querySelectorAll('.gpaCredits');
let existingCreds = document.querySelector(".existing-credits");
let existingGpa = document.querySelector(".existing-gpa");
let newCourseRow = document.querySelectorAll(".new-course-row");
const currentGpa = document.getElementsByClassName("current-gpa");
const gpaScore = document.querySelector(".gpa-score");
const enteredExistingCreds = document.getElementsByClassName("current-total-credits");
const calculate = document.querySelector(".calculate");
const classError = document.querySelector(".missing-class-error");
let entriesOuput = document.querySelector(".entries-output");

 //save output to local storage for easy access until cleared
document.addEventListener('DOMContentLoaded', function() {
    //PREVENT FORM FROM RELAODING
    const form = document.querySelector('#prevent-default');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    })
    // ADD NEW CLASS ROW
    let rowCount = course.length + 1; //The number of elements using the class course
    const addRow = document.querySelector('.btn-add-row'); //get the button to add row
    const addClassRow = () => { 
        const gpaFormDiv = document.querySelector('.gpaFormDiv'); //get the div containing the form
        // A variable holding the html to create a new row 
        const newRow = `
            <div class="addCourseRow">
               <label for="class">Course ${rowCount}</label>
               <input type="text" name="class" placeholder="Course" class="course">
               <label for="grade">Grade</label>
               <select class="grade" name="grade">
                  <option value="4">A</option>
                  <option value="3.7">A-</option>
                  <option value="3.3">B+</option>
                  <option value="3">B</option>
                  <option value="2.7">B-</option>
                  <option value="2.3">C+</option>
                  <option value="2">C</option>
                  <option value="1.7">C-</option>
                  <option value="1.3">D+</option>
                  <option value="1">D</option>
                  <option value="0.7">D-</option>
                  <option value="0">F</option>
               </select>
               <span>
                  <label for="credits">Credits</label>
                  <input type="text" name="credits" class="gpaCredits">
               </span>
            </div>
            <br>
        `
        rowCount += 1 // Add one to the text that count the number of courses listed
        gpaFormDiv.innerHTML += newRow // Add the new row to as the last item int he container holding the form
        // log this message in the console to confirm row was added
        console.log("class row added") 
    }
    addRow.addEventListener('click', addClassRow);  // listen for clicks on the add row btn

    // listen for clicks on the calculate button
    calculate.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Input error control
      for (let i = course.length - 1; i >= 0; i-=1) {
        let credValue = creditsElements[i].value
        course[i].value === "" || credValue === "" ?  // if course or credits is empty show err msf 
        classError.classList.remove('d-none') : classError.classList.add('d-none') // else hide error msg
      }
      
      //check if there is value else defaul val is 0
      let enteredExistingCreds = existingCreds.value || 0; 
      let enteredExistingGpa = existingGpa.value || 0;

      //get the total amount of points the student already has excluding current semester points
      let totalExistingPoints = parseFloat(enteredExistingCreds * enteredExistingGpa);

      let totalCredits = parseFloat(enteredExistingCreds); //total credits including inputed current creds
      let totalPoints = parseFloat(totalExistingPoints); //total poitns including inputed current points
        
      // Iterate through the grade elements
      gradeElements.forEach(function(gradeElement, index) {
        let gradeValue = parseFloat(gradeElement.value); 
        let creditsValue = parseFloat(creditsElements[index].value);
  
        if (!isNaN(gradeValue) && !isNaN(creditsValue)) {
          totalPoints += gradeValue * creditsValue
          totalCredits += creditsValue;
        }
      });
      
      let newGPA = parseFloat(totalPoints / totalCredits).toFixed(2)
      if (!isNaN(newGPA)) {
        gpaScore.textContent = newGPA;
      } else {
        gpaScore.textContent = parseFloat(0).toFixed(2)
      }


      /*
        This block of code below display a paragraph that gives
        a brief description of what the user entered in the form
       */
      let courseTaking = 0;
      let courseStringFormat = ''
      let gradeStringFormat = ''
      let entryStringFormat = ''

      for (let aCourse of course) {
       if (aCourse.value !== "") {
        courseTaking += 1;
       }
      }

      if (courseTaking > 1) {
        courseStringFormat = "classes";
        entryStringFormat ="entries";
        gradeStringFormat ="grades";
      } else {
        courseStringFormat = "class";
        entryStringFormat ="entry";
        gradeStringFormat ="grade";
      }

      entriesOuput.textContent = (
          `Based on your most recent calculation, ${entryStringFormat} and the ${gradeStringFormat} you received for your 
          ${courseTaking} entered ${courseStringFormat}, 
          your GPA will be ${gpaScore.textContent}`
      );

      //get the entries output container
      const entriesOutputContainer = document.querySelector(".entries-output-container");
      entriesOutputContainer.classList.remove("d-none")
      entriesOutputContainer.classList.add("d-block")

      //clear the entries output text on click
      const clearEntriesOutput = document.querySelector(".clear-entries-output");
      clearEntriesOutput.addEventListener("click", function(){
        entriesOutputContainer.classList.add("d-none");
      })

      //end
      
      //Check to see if GPA is a number, if not set new score to be 0.00
      //save the calculated gpa in local storage
      if (gpaScore.textContent === ' ') {
        localStorage.setItem("Estimated GPA", parseFloat(0).toFixed(2))
      } else {
        localStorage.setItem("Estimated GPA", gpaScore.textContent)
      }
      

      //test code below
      if (totalCredits > 0) {
        var gpa = totalPoints / totalCredits;
        console.log('Your GPA is:', gpa);
      } else {
        console.log('No valid grades or credits provided.');
      }
    });


    //getting the gp
    let savedScore = localStorage.getItem('Estimated GPA');

    if (!savedScore) {
      gpaScore.textContent = parseFloat(0).toFixed(2);
    } else {
      gpaScore.textContent = parseFloat(savedScore).toFixed(2);
    }
});