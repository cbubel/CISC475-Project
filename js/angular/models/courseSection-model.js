class CourseSection {
    constructor(sectionID="", instructor="", startTime="", endTime="", days, numberOfStudents, undergradTAsNeeded, gradTAsNeeded, undergradLAsNeeded) {
      this.sectionID = sectionID;
      this.instructor = instructor;
      this.startTime = startTime;
      this.endTime = endTime;
      this.days = [false, false, false, false, false];
      this.numberOfStudents = 0;
      this.undergradTAsNeeded = 0;
      this.gradTAsNeeded = 0;
      this.undergradLAsNeeded = 0;
    }
}
