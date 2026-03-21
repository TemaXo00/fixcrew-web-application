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
            description:
              'Comprehensive maintenance and repair service for range hoods, including cleaning, inspection, and component testing.',
          },
          {
            id: 2,
            title: 'Range Hood Diagnostic',
            description:
              'Identify the cause of poor ventilation, excessive noise, non-functional lights, or unresponsive controls with a full system evaluation.',
          },
          {
            id: 3,
            title: 'Range Hood Fan Motor Replacement',
            description:
              'Restore proper airflow and ventilation by replacing a worn, seized, or noisy fan motor that fails to operate.',
          },
          {
            id: 4,
            title: 'Range Hood Light Replacement',
            description:
              'Fix non-functional or flickering hood lights by replacing burned-out bulbs or faulty light sockets.',
          },
          {
            id: 5,
            title: 'Range Hood Control Switch Replacement',
            description:
              'Eliminate unresponsive fan speed buttons or light switches by replacing worn or failed control switches.',
          },
        ],
      },
      {
        id: 8,
        title: 'General Services',
        subCategories: [
          {
            id: 1,
            title: 'Services - Labor 30 Minutes',
            description:
              'Labor charge for service calls requiring up to 30 minutes of work, including minor repairs, adjustments, or inspections.',
          },
          {
            id: 2,
            title: 'Services - Labor 1 Hour',
            description:
              'Labor charge for service calls requiring up to one hour of work, covering standard repairs and component replacements.',
          },
          {
            id: 3,
            title: 'Services - Labor 2 Hours',
            description:
              'Labor charge for service calls requiring up to two hours of work, including complex repairs or multiple component replacements.',
          },
          {
            id: 4,
            title: 'Services - Shipping',
            description:
              'Cost associated with shipping parts to the service location or customer address for repair completion.',
          },
          {
            id: 5,
            title: 'Parts Pickup',
            description:
              'Service charge for collecting required replacement parts from suppliers to complete a repair.',
          },
          {
            id: 6,
            title: 'Parts Installation',
            description:
              'Labor charge specifically for installing customer-provided or replacement parts during a service visit.',
          },
          {
            id: 7,
            title: 'Return Visit',
            description:
              'Charge for a follow-up service visit to complete a repair, reinstall appliances, or address unresolved issues from a previous call.',
          },
          {
            id: 8,
            title: 'Emergency Service Call',
            description:
              'Premium service charge for urgent after-hours or same-day repairs requiring immediate attention outside standard business hours.',
          },
        ],
      },
      {
        id: 9,
        title: 'General Appliance',
        subCategories: [
          {
            id: 1,
            title: 'General Appliance Repair 1',
            description:
              'Comprehensive repair service for a wide range of household appliances, including diagnosis and basic repairs.',
          },
          {
            id: 2,
            title: 'General Appliance Repair 2',
            description:
              'Complete appliance repair service covering minor component replacements and system adjustments.',
          },
          {
            id: 3,
            title: 'General Appliance Repair 3',
            description:
              'Full-service repair for common appliance issues, from electrical problems to mechanical failures.',
          },
          {
            id: 4,
            title: 'General Appliance Repair 4',
            description:
              'Professional repair service addressing operational issues across all major appliance categories.',
          },
          {
            id: 5,
            title: 'General Appliance Repair 5',
            description:
              'Comprehensive troubleshooting and repair for appliances experiencing intermittent or consistent failures.',
          },
          {
            id: 6,
            title: 'General Appliance Repair 6',
            description:
              'Expert repair service covering all major components including motors, pumps, and control systems.',
          },
          {
            id: 7,
            title: 'General Appliance Repair 7',
            description:
              'Complete diagnostic and repair solution for appliances of any brand or model.',
          },
          {
            id: 8,
            title: 'General Appliance Repair 8',
            description:
              'Professional service addressing unusual noises, poor performance, and complete operational failures.',
          },
          {
            id: 9,
            title: 'General Appliance Repair 9',
            description:
              'Comprehensive repair service backed by thorough testing and quality replacement parts.',
          },
          {
            id: 10,
            title: 'General Appliance Repair 10',
            description:
              'Full-service appliance repair including disassembly, repair, and reassembly with proper calibration.',
          },
          {
            id: 11,
            title: 'General Appliance Repair 11',
            description:
              'Expert diagnostic and repair for appliances displaying error codes or performance issues.',
          },
          {
            id: 12,
            title: 'General Appliance Repair 12',
            description:
              'Complete repair solution covering electrical, mechanical, and electronic components.',
          },
          {
            id: 13,
            title: 'General Appliance Repair 13',
            description:
              'Professional service ensuring your appliances return to optimal operating condition.',
          },
          {
            id: 14,
            title: 'General Appliance Repair 14',
            description:
              'Comprehensive repair for major appliances including washers, dryers, refrigerators, and more.',
          },
          {
            id: 15,
            title: 'General Appliance Repair 15',
            description:
              'Expert troubleshooting and repair for appliances with complex failure modes.',
          },
          {
            id: 16,
            title: 'General Appliance Repair 16',
            description:
              'Complete diagnostic service followed by precise repair of identified issues.',
          },
          {
            id: 17,
            title: 'General Appliance Repair 17',
            description:
              'Professional repair service with focus on long-term reliability and performance.',
          },
          {
            id: 18,
            title: 'General Appliance Repair 18',
            description:
              'Comprehensive repair addressing both primary failures and underlying contributing factors.',
          },
          {
            id: 19,
            title: 'General Appliance Repair 19',
            description:
              'Expert service covering all appliance types with manufacturer-grade replacement parts.',
          },
          {
            id: 20,
            title: 'General Appliance Repair 20',
            description:
              'Complete repair solution for appliances exhibiting unusual sounds, leaks, or operational failures.',
          },
          {
            id: 21,
            title: 'General Appliance Repair 21',
            description:
              'Professional diagnostic and repair service with thorough post-repair testing.',
          },
          {
            id: 22,
            title: 'General Appliance Repair 22',
            description:
              'Comprehensive appliance repair ensuring all components function correctly before completion.',
          },
          {
            id: 23,
            title: 'General Appliance Repair 23',
            description:
              'Expert repair for appliances with intermittent issues that are difficult to diagnose.',
          },
          {
            id: 24,
            title: 'General Appliance Repair 24',
            description:
              'Complete service covering everything from minor adjustments to major component replacements.',
          },
          {
            id: 25,
            title: 'General Appliance Repair 25',
            description:
              'Professional repair service with detailed diagnostics and transparent solutions.',
          },
          {
            id: 26,
            title: 'General Appliance Repair 26',
            description:
              'Comprehensive repair for appliances experiencing reduced performance or complete failure.',
          },
          {
            id: 27,
            title: 'General Appliance Repair 27',
            description:
              'Expert troubleshooting and repair using advanced diagnostic tools and techniques.',
          },
          {
            id: 28,
            title: 'General Appliance Repair 28',
            description:
              'Complete appliance repair service with focus on efficiency and lasting results.',
          },
          {
            id: 29,
            title: 'General Appliance Repair 29',
            description:
              'Professional service addressing electrical faults, mechanical breakdowns, and control system issues.',
          },
          {
            id: 30,
            title: 'General Appliance Repair 30',
            description:
              'Comprehensive diagnostic and repair for appliances of any age or condition.',
          },
          {
            id: 31,
            title: 'General Appliance Repair 31',
            description:
              'Expert repair service with commitment to quality workmanship and customer satisfaction.',
          },
          {
            id: 32,
            title: 'General Appliance Repair 32',
            description:
              'Complete repair solution for appliances experiencing overheating, noise, or performance degradation.',
          },
          {
            id: 33,
            title: 'General Appliance Repair 33',
            description:
              'Professional diagnostic and repair covering all major systems and components.',
          },
          {
            id: 34,
            title: 'General Appliance Repair 34',
            description:
              'Comprehensive appliance repair ensuring safe and reliable operation after service.',
          },
          {
            id: 35,
            title: 'General Appliance Repair 35',
            description:
              'Expert troubleshooting for appliances with complex or intermittent fault conditions.',
          },
          {
            id: 36,
            title: 'General Appliance Repair 36',
            description:
              'Complete repair service with detailed inspection and quality replacement parts.',
          },
          {
            id: 37,
            title: 'General Appliance Repair 37',
            description:
              'Professional service addressing all common appliance failures with precision.',
          },
          {
            id: 38,
            title: 'General Appliance Repair 38',
            description:
              'Comprehensive diagnostic and repair for appliances showing signs of wear or malfunction.',
          },
          {
            id: 39,
            title: 'General Appliance Repair 39',
            description:
              'Expert repair service with focus on restoring full functionality and efficiency.',
          },
          {
            id: 40,
            title: 'General Appliance Repair 40',
            description:
              'Complete repair solution for electrical, electronic, and mechanical appliance issues.',
          },
          {
            id: 41,
            title: 'General Appliance Repair 41',
            description:
              'Professional diagnostic and repair service with thorough testing after completion.',
          },
          {
            id: 42,
            title: 'General Appliance Repair 42',
            description:
              'Comprehensive repair addressing both obvious failures and hidden contributing issues.',
          },
          {
            id: 43,
            title: 'General Appliance Repair 43',
            description: 'Expert service covering all major appliance brands and models.',
          },
          {
            id: 44,
            title: 'General Appliance Repair 44',
            description:
              'Complete repair service with emphasis on durability and long-term performance.',
          },
          {
            id: 45,
            title: 'General Appliance Repair 45',
            description:
              'Professional troubleshooting and repair for appliances with persistent operational problems.',
          },
          {
            id: 46,
            title: 'General Appliance Repair 46',
            description: 'Comprehensive diagnostic service followed by precise, effective repairs.',
          },
          {
            id: 47,
            title: 'General Appliance Repair 47',
            description:
              'Expert repair for appliances experiencing electrical failures or control board issues.',
          },
          {
            id: 48,
            title: 'General Appliance Repair 48',
            description: 'Complete repair solution with focus on safety and reliable operation.',
          },
          {
            id: 49,
            title: 'General Appliance Repair 49',
            description:
              'Professional service addressing mechanical breakdowns and component failures.',
          },
          {
            id: 50,
            title: 'General Appliance Repair 50',
            description: 'Comprehensive repair ensuring all appliance functions operate correctly.',
          },
          {
            id: 51,
            title: 'General Appliance Repair 51',
            description:
              'Expert diagnostic and repair for appliances with complex electronic control systems.',
          },
          {
            id: 52,
            title: 'General Appliance Repair 52',
            description:
              'Complete repair service with detailed assessment and quality workmanship.',
          },
          {
            id: 53,
            title: 'General Appliance Repair 53',
            description:
              'Professional service for appliances requiring specialized repair techniques.',
          },
          {
            id: 54,
            title: 'General Appliance Repair 54',
            description:
              'Comprehensive repair covering all components from motors to control boards.',
          },
          {
            id: 55,
            title: 'General Appliance Repair 55',
            description: 'Expert troubleshooting and repair with focus on accurate diagnosis.',
          },
          {
            id: 56,
            title: 'General Appliance Repair 56',
            description:
              'Complete repair solution for appliances with unusual or hard-to-diagnose issues.',
          },
          {
            id: 57,
            title: 'General Appliance Repair 57',
            description:
              'Professional diagnostic and repair service with commitment to excellence.',
          },
          {
            id: 58,
            title: 'General Appliance Repair 58',
            description: 'Comprehensive repair ensuring optimal performance and energy efficiency.',
          },
          {
            id: 59,
            title: 'General Appliance Repair 59',
            description:
              'Expert service for appliances requiring precise calibration or adjustment.',
          },
          {
            id: 60,
            title: 'General Appliance Repair 60',
            description: 'Complete repair service with thorough testing and quality assurance.',
          },
          {
            id: 61,
            title: 'General Appliance Repair 61',
            description: 'Professional repair covering all aspects of appliance functionality.',
          },
          {
            id: 62,
            title: 'General Appliance Repair 62',
            description:
              'Comprehensive diagnostic and repair for appliances with multiple failure points.',
          },
          {
            id: 63,
            title: 'General Appliance Repair 63',
            description:
              'Expert troubleshooting and repair using industry-leading diagnostic methods.',
          },
          {
            id: 64,
            title: 'General Appliance Repair 64',
            description:
              'Complete repair solution with focus on restoring appliance to factory specifications.',
          },
          {
            id: 65,
            title: 'General Appliance Repair 65',
            description:
              'Professional service addressing both immediate issues and preventive maintenance.',
          },
          {
            id: 66,
            title: 'General Appliance Repair 66',
            description:
              'Comprehensive repair ensuring long-term reliability and customer satisfaction.',
          },
          {
            id: 67,
            title: 'General Appliance Repair 67',
            description:
              'Expert diagnostic and repair for appliances with intermittent or sporadic issues.',
          },
          {
            id: 68,
            title: 'General Appliance Repair 68',
            description:
              'Complete repair service with detailed documentation and follow-up support.',
          },
          {
            id: 69,
            title: 'General Appliance Repair 69',
            description:
              'Professional service for appliances requiring specialized knowledge and tools.',
          },
          {
            id: 70,
            title: 'General Appliance Repair 70',
            description:
              'Comprehensive repair covering electrical, mechanical, and electronic systems.',
          },
          {
            id: 71,
            title: 'General Appliance Repair 71',
            description:
              'Expert troubleshooting and repair with emphasis on accurate problem identification.',
          },
          {
            id: 72,
            title: 'General Appliance Repair 72',
            description:
              'Complete repair solution for appliances with performance or safety concerns.',
          },
          {
            id: 73,
            title: 'General Appliance Repair 73',
            description:
              'Professional diagnostic and repair service with transparent pricing and solutions.',
          },
          {
            id: 74,
            title: 'General Appliance Repair 74',
            description:
              'Comprehensive repair ensuring all safety features and systems function correctly.',
          },
          {
            id: 75,
            title: 'General Appliance Repair 75',
            description:
              'Expert service for appliances with complex failure patterns or unusual symptoms.',
          },
          {
            id: 76,
            title: 'General Appliance Repair 76',
            description: 'Complete repair service with focus on efficiency and minimal disruption.',
          },
          {
            id: 77,
            title: 'General Appliance Repair 77',
            description: 'Professional repair covering all major appliance categories and brands.',
          },
          {
            id: 78,
            title: 'General Appliance Repair 78',
            description: 'Comprehensive diagnostic and repair with thorough post-service testing.',
          },
          {
            id: 79,
            title: 'General Appliance Repair 79',
            description:
              'Expert troubleshooting and repair for appliances with electronic control failures.',
          },
          {
            id: 80,
            title: 'General Appliance Repair 80',
            description:
              'Complete repair solution with commitment to quality parts and workmanship.',
          },
          {
            id: 81,
            title: 'General Appliance Repair 81',
            description:
              'Professional service addressing mechanical wear and component deterioration.',
          },
          {
            id: 82,
            title: 'General Appliance Repair 82',
            description:
              'Comprehensive repair ensuring full restoration of appliance functionality.',
          },
          {
            id: 83,
            title: 'General Appliance Repair 83',
            description:
              'Expert diagnostic and repair for appliances with uncommon or rare failure modes.',
          },
          {
            id: 84,
            title: 'General Appliance Repair 84',
            description:
              'Complete repair service with detailed inspection and preventive recommendations.',
          },
          {
            id: 85,
            title: 'General Appliance Repair 85',
            description:
              'Professional service for appliances requiring precise component matching and installation.',
          },
          {
            id: 86,
            title: 'General Appliance Repair 86',
            description:
              'Comprehensive repair covering all operational aspects from startup to shutdown.',
          },
          {
            id: 87,
            title: 'General Appliance Repair 87',
            description:
              'Expert troubleshooting and repair with focus on lasting results and reliability.',
          },
          {
            id: 88,
            title: 'General Appliance Repair 88',
            description:
              'Complete repair solution with thorough quality control and customer verification.',
          },
          {
            id: 89,
            title: 'General Appliance Repair 89',
            description:
              'Professional diagnostic and repair service ensuring complete satisfaction and appliance longevity.',
          },
        ],
      },
    ],
  },
]
