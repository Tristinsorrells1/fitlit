class Hydration {
  constructor(hydrationData){
    this.hydrationData = hydrationData
  
 }
   findAvrgFluidIntake(id) {
    const getUserFluidInfo = this.hydrationData.filter(data => data.userID === id)
     const calculateAvrgFluids = getUserFluidInfo.reduce((accum, data) => {
      return accum += data.numOunces;
     }, 0) / getUserFluidInfo.length;
     return parseInt(calculateAvrgFluids.toFixed(0))
 }

  findDailyFluidIntake(id, day) {
      const getDailyFluid = this.hydrationData.filter(data => data.date === day) 
     const findUserOnDate = getDailyFluid.find((data) => {
      return data.userID === id;
     }) 
     return findUserOnDate.numOunces;
 }

   findWeeklyFluidIntake(id) {
      const userIdInfo = this.hydrationData.filter((data) => {
        return data.userID === id;
      }) 
      const weeklyFluid = () => {
        let fluidByDay = {}
        fluidByDay.dayOne = userIdInfo[0].numOunces;
        fluidByDay.dayTwo = userIdInfo[1].numOunces;
        fluidByDay.dayThree = userIdInfo[2].numOunces;
        fluidByDay.dayFour = userIdInfo[3].numOunces;
        fluidByDay.dayFive = userIdInfo[4].numOunces;
        fluidByDay.daySix = userIdInfo[5].numOunces;
        fluidByDay.daySeven = userIdInfo[6].numOunces;
        return fluidByDay;
      };
     return weeklyFluid(); 
 }
};

export default Hydration;