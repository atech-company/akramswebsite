/**
 * Image URLs for AkramsLab demo content.
 * Thematically matched to AkramsLab products & projects (ESP32, PCB, Arduino, Robotics).
 * Sources: Unsplash (engineering/IoT), UI Avatars, Wikimedia partner logos.
 */

const unsplash = (photoId: string, w = 800) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  esp32SmartBoard: unsplash("photo-1558618666-fcd25c85f82"),
  easyboard: unsplash("photo-1625842268584-8f3296236761"),
  bluetoothBoard: unsplash("photo-1518770660439-4636190af475"),
  roboticCarPcb: unsplash("photo-1581091226825-a6a2a5aee158"),

  roboticChassis: unsplash("photo-1535378917022-10e22fd51d68"),
  smartTrafficLight: unsplash("photo-1449824913935-59a10b8d2000"),
  obstacleRobot: unsplash("photo-1485827404703-89b55fcc595e"),
  fpvGimbal: unsplash("photo-1473968512647-3e447244af8f"),
  solarControl: unsplash("photo-1509391366360-2e959784a276"),

  coursePcb: unsplash("photo-1581092160562-40aa08e78837"),
  courseAvr: unsplash("photo-1625842268584-8f3296236761"),
  courseEsp32: unsplash("photo-1558494949-ef010cbdcc31"),
  courseRobotics: unsplash("photo-1531746795393-6c60f3ed90b4"),
  coursePcbManufacturing: unsplash("photo-1581092918056-0c4c3acd3789"),

  blogMicrocontroller: unsplash("photo-1629654299529-8f4b6e1e5c8f"),
  blogPcbDesign: unsplash("photo-1518770660439-4636190af475"),
  blogTrafficLight: unsplash("photo-1449824913935-59a10b8d2000"),
  blogEsp32Launch: unsplash("photo-1558618666-fcd25c85f82"),

  galleryLab: unsplash("photo-1581092160562-40aa08e78837", 600),
  galleryWorkshop: unsplash("photo-1581092918056-0c4c3acd3789", 600),
  gallerySoldering: unsplash("photo-1625842268584-8f3296236761", 600),
  galleryWebinar: unsplash("photo-1524178232363-1fb2b075b655", 600),
  galleryEducation: unsplash("photo-1523240795612-9a054b0db644", 600),

  akramHussein: "https://ui-avatars.com/api/?name=Akram+Hussein&background=3b82f6&color=fff&size=256&bold=true",
  heroBackground: unsplash("photo-1518770660439-4636190af475", 1920),

  eventWebinar: unsplash("photo-1524178232363-1fb2b075b655"),
  eventWorkshop: unsplash("photo-1581092160562-40aa08e78837"),

  partners: {
    pcbway: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/PCB_layout.png/320px-PCB_layout.png",
    ieee: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/320px-IEEE_logo.svg.png",
    arduino: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Arduino_Logo.svg/320px-Arduino_Logo.svg.png",
  },
} as const;

export const courseImages: Record<string, string> = {
  "pcb-design-microcontrollers": images.coursePcb,
  "avr-embedded-systems": images.courseAvr,
  "iot-esp32-smart-board": images.courseEsp32,
  "arduino-robotics": images.courseRobotics,
  "pcb-idea-to-hardware": images.coursePcbManufacturing,
};

export const productImages: Record<string, string> = {
  easyboard: images.easyboard,
  "esp32-smart-board": images.esp32SmartBoard,
  "bluetooth-board-v1-1": images.bluetoothBoard,
  "robotic-car-chassis-pcb": images.roboticCarPcb,
};

export const portfolioImages: Record<string, string> = {
  "robotic-car-chassis-pcb": images.roboticChassis,
  "esp32-smart-board": images.esp32SmartBoard,
  "smart-traffic-light": images.smartTrafficLight,
  "obstacle-avoidance-robot": images.obstacleRobot,
  "fpv-gimbal-controller": images.fpvGimbal,
  "solar-hydropower-control": images.solarControl,
};

export const blogImages: Record<string, string> = {
  "what-is-microcontroller": images.blogMicrocontroller,
  "robotic-car-chassis-pcb-design": images.blogPcbDesign,
  "smart-traffic-light-easyboard": images.blogTrafficLight,
  "esp32-educational-board": images.blogEsp32Launch,
};

export const galleryImageList = [
  { title: "ESP32 Smart Board", category: "products", src: images.esp32SmartBoard },
  { title: "EasyBoard in Classroom", category: "education", src: images.galleryEducation },
  { title: "Robotic Car Chassis PCB", category: "pcb", src: images.roboticCarPcb },
  { title: "Smart Traffic Light Demo", category: "projects", src: images.smartTrafficLight },
  { title: "Obstacle Avoidance Robot", category: "robotics", src: images.obstacleRobot },
  { title: "PCB Design Workshop", category: "workshop", src: images.galleryWorkshop },
  { title: "FPV Gimbal Prototype", category: "drones", src: images.fpvGimbal },
  { title: "Bluetooth Board V1.1", category: "products", src: images.bluetoothBoard },
  { title: "University Webinar", category: "events", src: images.galleryWebinar },
  { title: "Solar Control Board", category: "energy", src: images.solarControl },
  { title: "Lab Training Session", category: "education", src: images.galleryLab },
  { title: "Soldering & Assembly", category: "workshop", src: images.gallerySoldering },
];

export const serviceImages: Record<string, string> = {
  "pcb-design": images.coursePcb,
  "control-boards": images.easyboard,
  "embedded-systems": images.blogMicrocontroller,
  iot: images.esp32SmartBoard,
  "robotics-drones": images.obstacleRobot,
  "educational-hardware": images.galleryEducation,
  "renewable-energy": images.solarControl,
  "training-webinars": images.galleryWebinar,
};

export const eventImages: Record<string, string> = {
  "pcb-microcontrollers-webinar": images.eventWebinar,
  "pcb-idea-to-hardware-webinar": images.eventWebinar,
  "esp32-iot-workshop": images.eventWorkshop,
};
