class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  };

  checkForValidId(id) {
    let filteredHydrationData = this.hydrationData.filter(data => data.userID === id);
    if (filteredHydrationData.length === 0) {
      return false;
    }; 
    return true;
  };

  findUsersHydrationData(id) {
    if (!this.checkForValidId(id)) {
      return 'no id found';
    };
    return this.hydrationData.filter(data => data.userID === id);
  };

  findAvrgFluidIntake(id) {
    if (!this.checkForValidId(id)) {
      return 'no id found';
    };
    const calculateAvrgFluids = this.findUsersHydrationData(id).reduce((accum, data) => {
    return accum += Number(data.numOunces)
    }, 0) / this.findUsersHydrationData(id).length;
    return parseInt(calculateAvrgFluids.toFixed(0));
  };

  findDailyFluidIntake(id, day) { 
    if (!this.checkForValidId(id)) {
      return 'no id found';
    };
     const findUserOnDate = this.findUsersHydrationData(id).find(data => data.date === day);
     return findUserOnDate.numOunces;
  };

  findWeeklyFluidIntake(id) {
    if (!this.checkForValidId(id)) {
      return 'no id found';
    };
    const userIdInfo = this.findUsersHydrationData(id).reverse();
    const weeklyFluid = () => {
      let fluidByDay = {}
      fluidByDay.one = userIdInfo[6].numOunces;
      fluidByDay.two = userIdInfo[5].numOunces;
      fluidByDay.three = userIdInfo[4].numOunces;
      fluidByDay.four = userIdInfo[3].numOunces;
      fluidByDay.five = userIdInfo[2].numOunces;
      fluidByDay.six = userIdInfo[1].numOunces;
      fluidByDay.seven = userIdInfo[0].numOunces;
      return fluidByDay;
    };
    return weeklyFluid(); 
  };
};

export default Hydration;