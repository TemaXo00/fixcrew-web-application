import type { Types } from '@/interfaces/booking.interface.ts'

export const services: Types[] = [
  {
    id: 1,
    title: 'Residental Appliances',
    categories: [
      {
        id: 1,
        title: 'Refridgerators',
        subCategories: [
          {
            id: 1,
            title: 'Diagnostic',
            description:
              'Complete inspection and testing of all refrigerator components to identify issues',
          },
          {
            id: 2,
            title: 'Refrigerator',
            description: 'General repair and maintenance services for all refrigerator types',
          },
          {
            id: 3,
            title: 'Refrigerator temperature and sensor replacement',
            description:
              'Replace faulty temperature sensors to maintain proper cooling and food preservation',
          },
          {
            id: 4,
            title: 'Refrigerator defrost sensor replacement',
            description:
              'Install new defrost sensor to prevent ice buildup and ensure efficient operation',
          },
          {
            id: 5,
            title: 'Refrigerator evaporator fan replacement',
            description:
              'Replace malfunctioning evaporator fan to restore proper air circulation and cooling',
          },
          {
            id: 6,
            title: 'Refrigerator Control Board Replacement',
            description:
              'Install new control board to fix electronic issues and restore all refrigerator functions',
          },
          {
            id: 7,
            title: 'Refrigerator thermostat replacement',
            description:
              'Replace faulty thermostat for accurate temperature control and energy efficiency',
          },
          {
            id: 8,
            title: 'Refrigerator ice maker replacement',
            description: 'Install new ice maker assembly to restore automatic ice production',
          },
          {
            id: 9,
            title: 'Refrigerator water valve replacement',
            description:
              'Replace defective water inlet valve to fix water dispensing and ice making issues',
          },
          {
            id: 10,
            title: 'Refrigerator Door seal replacement',
            description:
              'Install new door gasket to prevent cold air leakage and improve energy efficiency',
          },
          {
            id: 11,
            title: 'Refrigerator defrost heater replacement',
            description:
              'Replace faulty defrost heater to prevent ice buildup and ensure proper cooling cycles',
          },
          {
            id: 12,
            title: 'Refrigerator compressor replacement',
            description:
              'Install new compressor to restore proper cooling when compressor has failed',
          },
          {
            id: 13,
            title: 'Refrigerator compressor start relay replacement',
            description:
              'Replace defective start relay to fix compressor starting issues and cooling problems',
          },
          {
            id: 14,
            title: 'Refrigerator sealed system repair',
            description:
              'Professional repair of the sealed cooling system including compressor, condenser, and evaporator',
          },
          {
            id: 15,
            title: 'Refrigerator freon leak repair',
            description:
              'Locate and repair refrigerant leaks, then recharge system to proper levels',
          },
          {
            id: 16,
            title: 'Refrigerator drain line cleaning',
            description:
              'Clear clogged drain lines to prevent water leaks and ice buildup in freezer',
          },
        ],
      },
      {
        id: 2,
        title: 'Washer',
        subCategories: [
          {
            id: 1,
            title: 'Washer Diagnostic',
            description:
              'Identify the root cause of unusual noises, leaks, or failure to start with a comprehensive machine assessment.',
          },
          {
            id: 2,
            title: 'Washer drain pump replacement',
            description:
              'Remove standing water and resolve draining issues by replacing faulty or clogged drain pumps.',
          },
          {
            id: 3,
            title: 'Washer water inlet valve replacement',
            description:
              'Fix slow filling, incorrect water temperature, or constant running by replacing the water inlet valve.',
          },
          {
            id: 4,
            title: 'Washer Door Lock replacement',
            description:
              'Restore proper operation and safety by replacing a faulty door lock that prevents the cycle from starting.',
          },
          {
            id: 5,
            title: 'Washer lid switch replacement',
            description:
              'Ensure the machine starts and stops safely by replacing a broken lid switch (for top-load models).',
          },
          {
            id: 6,
            title: 'Washer control board replacement',
            description:
              'Fix unresponsive buttons, erratic cycles, or error codes by replacing the main electronic control board.',
          },
          {
            id: 7,
            title: 'Washer belt replacement',
            description:
              'Eliminate slipping, squeaking, or failure to spin by replacing a worn or broken drive belt.',
          },
          {
            id: 8,
            title: 'Washer shock absorber replacement',
            description:
              'Reduce excessive vibration and loud banging during the spin cycle by replacing worn shock absorbers.',
          },
          {
            id: 9,
            title: 'Washer suspension rod replacement',
            description:
              'Stabilize a shaking washer and prevent "walking" by replacing worn suspension rods (for top-load models).',
          },
          {
            id: 10,
            title: 'Washer bearing replacement',
            description:
              'Quiet loud rumbling or grinding noises by replacing worn-out drum bearings.',
          },
        ],
      },
      {
        id: 3,
        title: 'Dryer',
        subCategories: [
          {
            id: 1,
            title: 'Dryer diagnostic',
            description:
              'Pinpoint the cause of no heat, tumbling issues, or unusual sounds with a thorough system assessment.',
          },
          {
            id: 2,
            title: 'Dryer heating element replacement',
            description:
              'Restore proper drying performance by replacing a burned-out heating element that fails to produce heat.',
          },
          {
            id: 3,
            title: 'Dryer thermal fuse replacement',
            description:
              "Fix a dryer that runs but won't start or overheats by replacing a blown thermal fuse (a common safety device).",
          },
          {
            id: 4,
            title: 'Dryer thermostat replacement',
            description:
              'Eliminate overheating or insufficient heat by replacing a faulty thermostat that fails to regulate temperature.',
          },
          {
            id: 5,
            title: 'Dryer belt replacement',
            description:
              "Fix a dryer that tumbles but doesn't spin or makes a squealing noise by replacing a broken or stretched belt.",
          },
          {
            id: 6,
            title: 'Dryer drum roller replacement',
            description:
              'Quiet loud thumping or squeaking sounds by replacing worn drum support rollers.',
          },
          {
            id: 7,
            title: 'Dryer idler pulley replacement',
            description:
              'Eliminate high-pitched squealing or scraping noises by replacing a worn idler pulley that maintains belt tension.',
          },
          {
            id: 8,
            title: 'Dryer vent cleaning',
            description:
              'Improve drying efficiency and reduce fire risk by removing lint buildup from the vent system.',
          },
          {
            id: 9,
            title: 'Dryer control board replacement',
            description:
              'Fix unresponsive controls, intermittent operation, or persistent error codes by replacing the main electronic control board.',
          },
        ],
      },
      {
        id: 4,
        title: 'Dishwasher',
        subCategories: [
          {
            id: 1,
            title: 'Dishwasher Diagnostic',
            description:
              'Identify the root cause of poor cleaning, leaks, error codes, or unusual noises with a complete system evaluation.',
          },
          {
            id: 2,
            title: 'Dishwasher Drain Pump Replacement',
            description:
              'Eliminate standing water at the bottom of the tub by replacing a faulty drain pump that fails to expel water.',
          },
          {
            id: 3,
            title: 'Dishwasher Circulation Pump Replacement',
            description:
              'Restore proper cleaning power by replacing a worn circulation pump that causes weak water spray or poor wash results.',
          },
          {
            id: 4,
            title: 'Dishwasher Water Inlet Valve Replacement',
            description:
              'Fix slow filling, no water, or continuous running by replacing a malfunctioning water inlet valve.',
          },
          {
            id: 5,
            title: 'Dishwasher Door Latch Replacement',
            description:
              'Resolve issues with the dishwasher not starting or stopping mid-cycle by replacing a broken or misaligned door latch.',
          },
          {
            id: 6,
            title: 'Dishwasher Control Board Replacement',
            description:
              'Fix unresponsive buttons, random operation, or persistent error codes by replacing the main electronic control board.',
          },
          {
            id: 7,
            title: 'Dishwasher Float Switch Replacement',
            description:
              'Prevent overfilling or water leaks by replacing a stuck or faulty float switch that fails to shut off water flow.',
          },
          {
            id: 8,
            title: 'Dishwasher Spray Arm Replacement',
            description:
              'Improve cleaning coverage by replacing cracked, clogged, or spinning spray arms that leave dishes dirty.',
          },
        ],
      },
      {
        id: 5,
        title: 'Oven/Range',
        subCategories: [
          {
            id: 1,
            title: 'Oven Diagnostic',
            description:
              'Identify the source of uneven heating, temperature fluctuations, or complete failure to heat with a comprehensive assessment.',
          },
          {
            id: 2,
            title: 'Oven heating element replacement',
            description:
              'Restore proper baking and broiling by replacing a burned-out heating element that fails to heat or heats unevenly.',
          },
          {
            id: 3,
            title: 'Oven temperature sensor replacement',
            description:
              'Fix inaccurate temperatures, undercooked or burnt food by replacing a faulty sensor that misreads internal heat levels.',
          },
          {
            id: 4,
            title: 'Oven igniter replacement',
            description:
              'Resolve gas oven issues where the burner fails to light or takes too long to ignite by replacing a weak igniter.',
          },
          {
            id: 5,
            title: 'Oven control board replacement',
            description:
              'Fix unresponsive buttons, inaccurate temperature display, or erratic cooking cycles by replacing the main electronic control board.',
          },
          {
            id: 6,
            title: 'Oven thermostat replacement',
            description:
              'Eliminate temperature inconsistencies and ensure accurate heat regulation by replacing a faulty thermostat.',
          },
          {
            id: 7,
            title: 'Cooktop burner replacement',
            description:
              'Restore proper flame or heating performance by replacing a damaged or non-functional electric or gas burner.',
          },
          {
            id: 8,
            title: 'Cooktop infinite switch replacement',
            description:
              "Fix burners that won't turn off, fail to heat, or don't maintain consistent temperature by replacing the infinite control switch.",
          },
          {
            id: 9,
            title: 'Cooktop igniter replacement',
            description:
              "Resolve gas burners that click but won't light or require manual lighting by replacing a faulty spark igniter.",
          },
          {
            id: 10,
            title: 'Cooktop control board replacement',
            description:
              'Fix unresponsive touch controls, error codes, or intermittent operation on electric or induction cooktops by replacing the control board.',
          },
        ],
      },
      {
        id: 6,
        title: 'Microwave',
        subCategories: [
          {
            id: 1,
            title: 'Microwave Diagnostic',
            description:
              'Pinpoint the cause of no heating, sparking, unusual noises, or unresponsive controls with a thorough system assessment.',
          },
          {
            id: 2,
            title: 'Microwave Magnetron Replacement',
            description:
              'Restore proper heating by replacing a failed magnetron that no longer generates the microwaves needed to cook food.',
          },
          {
            id: 3,
            title: 'Microwave Door Switch Replacement',
            description:
              "Fix a microwave that won't start, stops mid-cycle, or runs with the door open by replacing faulty door switches.",
          },
          {
            id: 4,
            title: 'Microwave Control Board Replacement',
            description:
              'Eliminate unresponsive buttons, incorrect cooking times, or persistent error codes by replacing the main control board.',
          },
          {
            id: 5,
            title: 'Microwave Turntable Motor Replacement',
            description:
              'Restore proper rotation of the glass tray by replacing a worn or seized turntable motor for even cooking.',
          },
        ],
      },
      {
        id: 7,
        title: 'Hood',
        subCategories: [
          {
            id: 1,
            title: 'Hood Service',
            description: ''
          },
          {
            id: 2,
            title: 'Range Hood Diagnostic',
            description: ''
          },
          {
            id: 3,
            title: 'Range Hood Fan Motor Replacement',
            description: ''
          },
          {
            id: 4,
            title: 'Range Hood Light Replacement',
            description: ''
          },
          {
            id: 5,
            title: 'Range Hood Control Switch Replacement',
            description: ''
          }
        ]
      }
    ],
  },
]
