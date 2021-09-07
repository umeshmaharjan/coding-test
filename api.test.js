const { resultantObject, groupedByLocationOptimized } = require('./api.js');

describe('group by first two letter of location key', () => {
  test('case 1', () => {
    const responseFromApi = {
      data: {
        dashboard: {
          type: 'CHEC2',
          isSAndGEditable: true,
          components: [
            {
              panelNumber: '22-58883-000',
              location: 'AGAAA',
            },
            {
              panelNumber: '22-69410-000',
              location: 'OVLHP',
            },
            {
              panelNumber: 'A06-30769-015',
              location: 'AG008',
            },
          ],
        },
      },
    };

    const result = {
      AG: {
        AGAAA: {
          panelNumber: '22-58883-000',
          location: 'AGAAA',
        },
        AG008: {
          panelNumber: 'A06-30769-015',
          location: 'AG008',
        },
      },
      OV: {
        OVLHP: {
          panelNumber: '22-69410-000',
          location: 'OVLHP',
        },
      },
    };

    expect(groupedByLocationOptimized(responseFromApi)).toEqual(result);
  });

  test('case 2', () => {
    const responseFromApi = {
      data: {
        dashboard: {
          type: 'CHEC2',
          isSAndGEditable: true,
          components: [
            {
              panelNumber: 'BW K043007',
              panelDescription: 'COLLET CAP,RED,1/4"',
              location: 'AV102',
              whitelist: ['AV101', 'AV102', 'AV103', 'AV104'],
              blacklist: [],
              isAsBuilt: true,
            },
            {
              panelNumber: 'BW K045468',
              panelDescription: 'COLLET CAP,WHITE,1/4"',
              location: 'AV101',
              modelCode: 'H',
              whitelist: ['AV101', 'AV102', 'AV103'],
              blacklist: [],
            },
            {
              location: 'AV103',
              parentPanelNumber: '900-C04759',
              modelCode: 'H',
              whitelist: ['AV101', 'AV102', 'AV103'],
            },
            {
              panelNumber: 'BW K125176',
              panelDescription: 'VALVE-TRLR BRAKE,DASH MTD,38N',
              location: 'AG031',
            },
            {
              panelNumber: 'CAS216806 004',
              panelDescription: 'RCPTL,12V,SURFACE MOUNT',
              location: 'AG084',
            },
          ],
        },
      },
    };

    const result = {
      AV: {
        AV102: {
          panelNumber: 'BW K043007',
          panelDescription: 'COLLET CAP,RED,1/4"',
          location: 'AV102',
          whitelist: ['AV101', 'AV102', 'AV103', 'AV104'],
          blacklist: [],
          isAsBuilt: true,
        },
        AV101: {
          panelNumber: 'BW K045468',
          panelDescription: 'COLLET CAP,WHITE,1/4"',
          location: 'AV101',
          modelCode: 'H',
          whitelist: ['AV101', 'AV102', 'AV103'],
          blacklist: [],
        },
        AV103: {
          location: 'AV103',
          parentPanelNumber: '900-C04759',
          modelCode: 'H',
          whitelist: ['AV101', 'AV102', 'AV103'],
        },
      },
      AG: {
        AG031: {
          panelNumber: 'BW K125176',
          panelDescription: 'VALVE-TRLR BRAKE,DASH MTD,38N',
          location: 'AG031',
        },
        AG084: {
          panelNumber: 'CAS216806 004',
          panelDescription: 'RCPTL,12V,SURFACE MOUNT',
          location: 'AG084',
        },
      },
    };

    expect(groupedByLocationOptimized(responseFromApi)).toEqual(result);
  });
});
