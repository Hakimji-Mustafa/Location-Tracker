const {createSlice} = require('@reduxjs/toolkit');

const DistanceSlice = createSlice({
  name: 'distance',
  initialState: {
    startData: [{startLatitude: 0, startLongitude: 0}],
    endData: {endlatitude: 0, endLongitude: 0},
    distance: 0,
    isBackgroundServiceRunnig: false,
  },
  reducers: {
    startLocations(state, action) {
      state.startData.push(action.payload);
      console.log('Redux Action Console Start ----> ', state.startData);
    },
    endLocation(state, action) {
      state.endData.endlatitude = action.payload.latitude;
      state.endData.endLongitude = action.payload.longitude;
      console.log('EndState --> ', state.endData);
    },
    clearLocationData(state) {
      state.startData = [{startLatitude: 0, startLongitude: 0}];
      state.endData.endlatitude = 0;
      state.endData.endLongitude = 0;
      console.log(
        'Redux Start data : ',
        state.startData,
        'End data : ',
        state.endData,
      );
    },
    backgroundServiceStartStop(state, action) {
      state.isBackgroundServiceRunnig = action.payload;
    },
    printSlice(state) {
      console.log('Redux StartData State --> ', state.startData);
      console.log(
        '-------------------------------------------------------------------------------------------',
      );
      console.log('Redux EndData State --> ', state.endData);
    },
  },
});

export const {
  startLocations,
  endLocation,
  clearLocationData,
  printSlice,
  showDistance,
  backgroundServiceStartStop,
} = DistanceSlice.actions;
export default DistanceSlice.reducer;
