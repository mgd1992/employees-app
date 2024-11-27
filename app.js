const { createApp } = Vue;

createApp({
  data() {
    return {
      employees: ["Augusto", "Marco", "Julia", "Nico", "Carmen", "Lucho", "Camila"],
      days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
      schedule: [],
    };
  },
  methods: {
    initializeSchedule() {
      this.schedule = Array.from({ length: 7 }, () => Array(this.employees.length).fill(false));
    },
    generateRoster() {
      this.initializeSchedule();

      this.employees.forEach((_, empIndex) => {
        let hours = 0;
        let dayIndex = 0;

        while (hours < 36) {
          if (Math.random() > 0.5 && this.canWork(empIndex, dayIndex)) {
            this.schedule[dayIndex][empIndex] = true;
            hours += 6;
          }
          dayIndex = (dayIndex + 1) % 7;
        }
      });
    },
    canWork(empIndex, dayIndex) {
      let workedDays = 0;

      for (let i = 0; i < 6; i++) {
        const prevDay = (dayIndex - i + 7) % 7;
        if (this.schedule[prevDay][empIndex]) workedDays++;
      }

      return workedDays < 6;
    },
    calculateTotalHours(empIndex) {
      return this.schedule.reduce((total, day) => total + (day[empIndex] ? 6 : 0), 0);
    },
  },
  mounted() {
    this.initializeSchedule();
  },
}).mount("#app");
