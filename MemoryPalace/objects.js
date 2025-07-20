const memoryPalaceObjects = [
    // Common household items
    "Apple", "Banana", "Car", "Dog", "Elephant", "Flower", "Guitar", "House", "Ice Cream", "Jacket",
    "Kite", "Lamp", "Mountain", "Notebook", "Orange", "Piano", "Queen", "Robot", "Sun", "Tree",
    "Umbrella", "Violin", "Whale", "Xylophone", "Yacht", "Zebra", "Book", "Chair", "Door", "Egg",
    "Fan", "Glass", "Hat", "Iron", "Jar", "Key", "Lion", "Mirror", "Nail", "Owl",
    "Pen", "Quilt", "Ring", "Shoe", "Table", "Urn", "Vase", "Watch", "X-ray", "Yarn",
    
    // Animals
    "Cat", "Bird", "Fish", "Horse", "Cow", "Pig", "Sheep", "Goat", "Duck", "Chicken",
    "Bear", "Wolf", "Fox", "Deer", "Rabbit", "Squirrel", "Mouse", "Rat", "Hamster", "Guinea Pig",
    "Tiger", "Leopard", "Cheetah", "Jaguar", "Panther", "Lynx", "Bobcat", "Cougar", "Ocelot", "Serval",
    "Monkey", "Gorilla", "Chimpanzee", "Orangutan", "Baboon", "Lemur", "Sloth", "Koala", "Panda", "Kangaroo",
    "Crocodile", "Alligator", "Snake", "Lizard", "Turtle", "Frog", "Toad", "Salamander", "Newt", "Iguana",
    
    // Food items
    "Pizza", "Burger", "Sandwich", "Salad", "Soup", "Pasta", "Rice", "Bread", "Cheese", "Milk",
    "Yogurt", "Butter", "Honey", "Sugar", "Salt", "Pepper", "Garlic", "Onion", "Tomato", "Potato",
    "Carrot", "Broccoli", "Spinach", "Lettuce", "Cucumber", "Bell Pepper", "Corn", "Peas", "Beans", "Lentils",
    "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Grape", "Cherry", "Peach", "Pear", "Plum", "Apricot",
    "Watermelon", "Cantaloupe", "Honeydew", "Pineapple", "Mango", "Papaya", "Kiwi", "Coconut", "Avocado", "Lemon",
    
    // Technology
    "Computer", "Laptop", "Phone", "Tablet", "Television", "Radio", "Camera", "Headphones", "Speaker", "Microphone",
    "Keyboard", "Mouse", "Monitor", "Printer", "Scanner", "Router", "Modem", "Cable", "Charger", "Battery",
    "Remote Control", "Game Controller", "Virtual Reality Headset", "Drone", "Robot Vacuum", "Smart Watch", "Fitness Tracker", "GPS", "Bluetooth Speaker", "Webcam",
    
    // Clothing
    "Shirt", "Pants", "Dress", "Skirt", "Jacket", "Coat", "Sweater", "Hoodie", "T-shirt", "Jeans",
    "Shorts", "Socks", "Underwear", "Bra", "Tie", "Scarf", "Gloves", "Mittens", "Belt", "Suspenders",
    "Pajamas", "Robe", "Slippers", "Boots", "Sneakers", "Sandals", "High Heels", "Flip Flops", "Clogs", "Loafers",
    
    // Sports & Recreation
    "Basketball", "Football", "Soccer Ball", "Tennis Ball", "Golf Ball", "Baseball", "Volleyball", "Ping Pong Ball", "Bowling Ball", "Pool Ball",
    "Racket", "Bat", "Club", "Paddle", "Stick", "Net", "Goal", "Hoop", "Target", "Dartboard",
    "Bicycle", "Skateboard", "Scooter", "Roller Skates", "Ice Skates", "Skis", "Snowboard", "Surfboard", "Kayak", "Canoe",
    
    // Musical Instruments
    "Drums", "Trumpet", "Saxophone", "Flute", "Clarinet", "Oboe", "Bassoon", "Tuba", "French Horn", "Trombone",
    "Harp", "Cello", "Viola", "Double Bass", "Mandolin", "Banjo", "Ukulele", "Harmonica", "Accordion", "Bagpipes",
    
    // Tools & Hardware
    "Hammer", "Screwdriver", "Wrench", "Pliers", "Saw", "Drill", "Level", "Measuring Tape", "Screws", "Nails",
    "Bolt", "Nut", "Washer", "Screw", "Anchor", "Wire", "Rope", "Chain", "Lock", "Hinge",
    "Paint Brush", "Roller", "Ladder", "Toolbox", "Work Bench", "Vise", "Clamp", "File", "Sandpaper", "Glue",
    
    // Nature
    "Rock", "Stone", "Pebble", "Sand", "Dirt", "Mud", "Clay", "Grass", "Moss", "Fern",
    "Oak Tree", "Pine Tree", "Maple Tree", "Birch Tree", "Palm Tree", "Cactus", "Rose", "Tulip", "Sunflower", "Daisy",
    "River", "Lake", "Ocean", "Stream", "Waterfall", "Mountain", "Hill", "Valley", "Desert", "Forest",
    
    // Transportation
    "Airplane", "Helicopter", "Train", "Bus", "Truck", "Motorcycle", "Boat", "Ship", "Submarine", "Rocket",
    "Taxi", "Ambulance", "Fire Truck", "Police Car", "School Bus", "Delivery Van", "Pickup Truck", "SUV", "Convertible", "Limousine",
    
    // Office Supplies
    "Stapler", "Paper Clips", "Rubber Bands", "Binder", "File Folder", "Calculator", "Ruler", "Scissors", "Tape", "Glue Stick",
    "Marker", "Highlighter", "Pencil", "Eraser", "Sharpener", "Hole Punch", "Laminator", "Paper Shredder", "Whiteboard", "Cork Board",
    
    // Kitchen Items
    "Stove", "Oven", "Microwave", "Refrigerator", "Dishwasher", "Blender", "Mixer", "Toaster", "Coffee Maker", "Tea Kettle",
    "Pot", "Pan", "Skillet", "Wok", "Casserole Dish", "Baking Sheet", "Cutting Board", "Knife", "Fork", "Spoon",
    "Plate", "Bowl", "Cup", "Mug", "Glass", "Wine Glass", "Champagne Flute", "Shot Glass", "Pitcher", "Serving Tray"
];

// Make it available globally instead of using ES6 modules
window.memoryPalaceObjects = memoryPalaceObjects; 