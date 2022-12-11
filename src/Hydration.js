class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  findUsersHydrationData(id) {
    return this.hydrationData.filter(data => data.userID === id);
  }
  findAvrgFluidIntake(id) {
    const calculateAvrgFluids = this.findUsersHydrationData(id).reduce((accum, data) => {
    return accum += data.numOunces
    }, 0) / this.findUsersHydrationData(id).length;
    return parseInt(calculateAvrgFluids.toFixed(0));
  }

  findDailyFluidIntake(id, day) { 
     const findUserOnDate = this.findUsersHydrationData(id).find(data => data.date === day);
     return findUserOnDate.numOunces;
  }

  findWeeklyFluidIntake(id) {
    const userIdInfo = this.findUsersHydrationData(id);
    const weeklyFluid = () => {
      let fluidByDay = {}
      fluidByDay.one = userIdInfo[0].numOunces;
      fluidByDay.two = userIdInfo[1].numOunces;
      fluidByDay.three = userIdInfo[2].numOunces;
      fluidByDay.four = userIdInfo[3].numOunces;
      fluidByDay.five = userIdInfo[4].numOunces;
      fluidByDay.six = userIdInfo[5].numOunces;
      fluidByDay.seven = userIdInfo[6].numOunces;
      return fluidByDay;
    };
    return weeklyFluid(); 
  }
}

export default Hydration;