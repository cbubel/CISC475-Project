class Student {
  constructor(isUndergrad, id, first_name, last_name, email, schedule, grades, tags) {
    this.isUndergrad = isUndergrad;
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.schedule = schedule === undefined ? [] : schedule;
    this.grades = grades === undefined ? [] : grades;
    this.tags = tags === undefined ? [] : tags;
  }

  addCourseTaking(course) {
    this.schedule.push(course);
  }

  removeCourseTaking(idx) {
    this.schedule.splice(idx, 1);
  }

  addGrade(grade) {
    this.grades.push(grade);
  }

  removeGrade(idx) {
    this.grades.splice(idx, 1);
  }
}
