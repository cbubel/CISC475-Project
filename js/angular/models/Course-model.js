class Course {
    constructor(courseID="", courseTags=[], sections=[]) {
        this.courseID = courseID;
        this.courseTags = courseTags === undefined ? [] : courseTags;
        this.sections = sections === undefined ? [] : sections;
    }

    addSection(section) {
      this.sections.push(section);
    }

    removeSection(idx) {
      this.sections.splice(idx, 1);
    }
}
