// GET ALL COURSE SECTION FIELDS
const course = document.querySelectorAll("course");
const grade1 = document.getElementsByClassName("grade1");
const grade2 = document.getElementsByClassName("grade2");
const grade3 = document.getElementsByClassName("grade3");
const grade4 = document.getElementsByClassName("grade4");
const grade5 = document.getElementsByClassName("grade5");
const grade6 = document.getElementsByClassName("grade6");
const grade7 = document.getElementsByClassName("grade7");
const grade8 = document.getElementsByClassName("grade8");
const credits = document.getElementsByClassName("credits");
const isRepeated1 = document.getElementsByClassName("repeated1");
const isRepeated2 = document.getElementsByClassName("repeated2");
const isRepeated3 = document.getElementsByClassName("repeated3");
const isRepeated5 = document.getElementsByClassName("repeated5");
const isRepeated6 = document.getElementsByClassName("repeated6");
const isRepeated7 = document.getElementsByClassName("repeated7");
const isRepeated8 = document.getElementsByClassName("repeated8");
const currentGpa = document.getElementsByClassName("current-gpa");
const totalExistingCredits = document.getElementsByClassName("current-total-credits");

// GET CURRENT CREDITS & GPA
const currentGpaVal = currentGpaEl.value();
const totalCredits = totalExistingCredits.value();

//GET GRADE VALUE ON SELECTION
const getGradesVal = () => {
    
    let grade1Val = grade1.value;
    let grade2Val = grade2.value;
    let grade3Val = grade3.value;
    let grade4Val = grade4.value;
    let grade5Val = grade5.value;
    let grade6Val = grade6.value;
    let grade7Val = grade7.value;
    let grade8Val = grade8.value;

    for (let val of grade1) {
        grade1Val = val;
    }

    alert(grade1Val)

}
