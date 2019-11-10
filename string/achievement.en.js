module.exports = {
    
    question: {
        name: '?????',
        description: '???????????????????????????',
        photo: 'question.svg'
    },
    glass: {
        name: 'Glass',
        description: 'It\'s just a glass.',
        photo: 'variable/juice/achievement-glass.svg',
        unlock: ['pc1']
    },
    orangeGlass: {
        name: 'Orange juice in glass',
        description: 'The orange juice that was carefully poured into the glass to add freshness to the drinker.',
        photo: 'variable/juice/achievement-orangeGlass.svg',
        unlock: ['pc1-pc2']
    },
    orangeOutsideGlass: {
        name: 'Orange juice outside glass',
        description: 'The orange juice that was poured in a hurry until spilled out of the glass.',
        photo: 'variable/juice/achievement-orangeOutsideGlass.svg',
        unlock: ['pc2-pc1']
    },
    orangeJuice: {
        name: 'Orange juice',
        description: 'It\'s Orange juice that was poured on the floor.',
        photo: 'variable/juice/achievement-orangeJuice.svg',
        unlock: ['pc2']
    },
    cereal:{
        name: 'Cereal in a bowl',
        description: 'Cereal in a bowl for eating is a snack and useful.',
        photo: 'variable/cereal/cereals.svg',
        unlock: ['pc1-pc3-pc4', 'pc3-pc1-pc4']
    },
    milk:{
        name: 'Milk in a bowl',
        description: 'Fresh milk in a bowl ready to drink.',
        photo: 'variable/cereal/milk.svg',
        unlock: ['pc1-pc2-pc4','pc2-pc1-pc4']
    },
    completeCereal: {
        name: 'Complete cereal',
        description: 'Cereals are a delicious choice that allows you to get full nutritional value from breakfast.',
        photo: 'variable/cereal/cereals-cereals.svg',
        unlock: ['pc1-pc2-pc3-pc4', 'pc1-pc3-pc2-pc4', 'pc2-pc1-pc3-pc4', 'pc2-pc3-pc1-pc4', 'pc3-pc1-pc2-pc4', 'pc3-pc2-pc1-pc4']
    },
    salad: {
        name: 'Organic salad',
        description: 'Organic vegetable salad with selected quality organic vegetables mixed with delicious salad dressing.',
        photo: 'variable/salad/salad.svg',
        unlock: ['pc1-pc2-pc3-pc4-pc5', 'pc1-pc3-pc2-pc4-pc5', 'pc2-pc1-pc3-pc4-pc5', 'pc2-pc3-pc1-pc4-pc5', 'pc3-pc1-pc2-pc4-pc5', 'pc3-pc2-pc1-pc4-pc5']
    },
    saladOutsideBowl: {
        name: 'salad outside bowl',
        description: 'Is it better to put a container?',
        photo: 'variable/salad/saladOutsideBowl.svg',
        unlock: ['pc2-pc3-pc4-pc5', 'pc3-pc2-pc4-pc5', 'pc2-pc3-pc4-pc5', 'pc2-pc3-pc4-pc5', 'pc3-pc2-pc4-pc5', 'pc3-pc2-pc4-pc5','pc1-pc2-pc3-pc5', 'pc1-pc3-pc2-pc5', 'pc2-pc1-pc3-pc5', 'pc2-pc3-pc1-pc5', 'pc3-pc1-pc2-pc5', 'pc3-pc2-pc1-pc5','pc2-pc3-pc5', 'pc3-pc2-pc5', 'pc2-pc3-pc5', 'pc2-pc3-pc5', 'pc3-pc2-pc5', 'pc3-pc2-pc5']
    },
    organicVegetables: {
        name: 'Organic vegetables',
        description: 'Fresh organic vegetables from the garden and non-toxic.',
        photo: 'variable/salad/organicVegetables.svg',
        unlock: ['pc1-pc2-pc4-pc5', 'pc1-pc2-pc4-pc5', 'pc2-pc1-pc4-pc5', 'pc2-pc1-pc4-pc5', 'pc1-pc2-pc4-pc5', 'pc2-pc1-pc4-pc5']
    },
    saladDressing: {
        name: 'Salad dressings',
        description: 'The salad dressing is used for eating with vegetables in order to have a better taste.',
        photo: 'variable/salad/saladDressing.svg',
        unlock: ['pc1-pc3-pc4-pc5', 'pc1-pc3-pc4-pc5', 'pc1-pc3-pc4-pc5', 'pc3-pc1-pc4-pc5', 'pc3-pc1-pc2-pc4-pc5', 'pc3-pc1-pc4-pc5']
    },
    appleJuice: {
        name: 'Apple juice',
        description: 'Apple juice that has been squeezed well from top apple.',
        photo: 'input_output/apple-juice/applejuice.svg',
        unlock: ['ip1-slice-pc1-op1']
    },
    appleIsTooBig: {
        name: 'Apple is too big',
        description: 'Apple is too big can not put the juicer Try to cut into small pieces?',
        photo: 'input_output/apple-juice/apple.svg',
        unlock: ['ip1-full-pc1-op1']
    },
    bread: {
        name: 'Bread',
        description: 'Soft and smooth white bread If you want toast, try adding a little more heat to the fire.',
        photo: 'input_output/bread/bread1.svg',
        unlock: ['pc1', 'pc1-ip1-low-op1']
    },
    toast: {
        name: 'Toast',
        description: 'Baked bread with the appropriate temperature makes the surface crisp and fragrant.',
        photo: 'input_output/bread/bread2.svg',
        unlock: ['pc1-ip1-mid-op1']
    },
    burnedBread: {
        name: 'Burned Bread',
        description: 'Bread that is heated by sunlight in Thailand.',
        photo: 'input_output/bread/bread3.svg',
        unlock: ['pc1-ip1-high-op1']
    },
    bacon: {
        name: 'Bacon',
        description: 'Bacon is juicy. If you want to eat crispy bacon, try adding a little more heat.',
        photo: 'input_output/bacon/bacon1.svg',
        unlock: ['pc1-ip1-low-ip2-three-op1','pc1-ip1-low-ip2-five-op1','pc1-ip1-mid-ip2-three-op1','pc1-ip2-three-ip1-low-op1','pc1-ip2-five-ip1-low-op1','pc1-ip2-three-ip1-mid-op1','pc1-ip2-three-op1','pc1-ip2-five-op1','pc1-ip2-ten-op1']
    },
    crispyBacon: {
        name: 'Crispy bacon',
        description: 'Frying bacon in the right temperature until crispy and ready to eat.',
        photo: 'input_output/bacon/bacon2.svg',
        unlock: ['pc1-ip1-mid-ip2-five-op1','pc1-ip1-low-ip2-ten-op1','pc1-ip1-high-ip2-three-op1','pc1-ip2-five-ip1-mid-op1','pc1-ip2-ten-ip1-low-op1','pc1-ip2-three-ip1-high-op1']
    },
    burntBacon: {
        name: 'Burnt bacon',
        description: 'Burnt bacon that smells burnt Try to reduce the heat probably better.',
        photo: 'input_output/bacon/bacon3.svg',
        unlock: ['pc1-ip1-high-op1','pc1-ip1-low-op1','pc1-ip1-mid-op1','pc1-ip1-mid-ip2-ten-op1','pc1-ip1-high-ip2-ten-op1','pc1-ip1-high-ip2-five-op1','pc1-ip2-ten-ip1-mid-op1','pc1-ip2-ten-ip1-high-op1','pc1-ip2-five-ip1-high-op1']
    },
    latte: {
        name: 'Latte',
        description: 'Coffee drinks prepared with hot milk.',
        photo: 'condition/coffee/latte.svg',
        unlock: ['pc1-ip1-true-dc1-op1']
    },
    espresso: {
        name: 'Espresso',
        description: 'Coffee that is strong and dark. Brew by using steam or hot water through finely ground roasted coffee beans.',
        photo: 'condition/coffee/espresso.svg',
        unlock: ['pc1-ip1-flase-dc1-op2']
    },
    mediumRareSteak: {
        name: 'Medium-Rare Steak',
        description: 'The steak that is semi-cooked and semi-raw, still has blood.',
        photo: 'condition/steak/steak1.svg',
        unlock: ['pc1-pc2-ip1-false-dc1-op1', 'pc2-pc1-ip1-false-dc1-op1']
    },
    mediumWellSteak: {
        name: 'Medium-Well Steak',
        description: 'The steak that is cooked but not yet cooked There is still a little blood.',
        photo: 'condition/steak/steak2.svg',
        unlock: ['pc1-pc2-ip1-true-dc1-op2', 'pc2-pc1-ip1-true-dc1-op2']
    },
    spaghettiCarbonara: {
        name: 'Spaghetti Carbonara',
        description: 'Pasta with lines form a long round. Topped with sauce carbonara.',
        photo: 'condition/spaghetti/spaghettiCarbonara.svg',
        unlock: ['ip1-pc1-dc1-true-pc2-ip2-dc2-true-pc4', 'pc1-ip1-dc1-true-pc2-ip2-dc2-true-pc4']
    },
    spaghettiBolognese: {
        name: 'Spaghetti Bolognese',
        description: 'Pasta with lines form a long round. Topped with sauce bolognese.',
        photo: 'condition/spaghetti/spaghettiBolognese.svg',
        unlock: ['ip1-pc1-dc1-true-pc2-ip2-dc2-false-pc5', 'pc1-ip1-dc1-true-pc2-ip2-dc2-false-pc5']
    },
    fettucineCarbonara: {
        name: 'Fettucine Carbonara',
        description: 'Pasta with lines form a long flat. Topped with sauce carbonara.',
        photo: 'condition/spaghetti/fettucineCarbonara.svg',
        unlock: ['ip1-pc1-dc1-false-pc3-ip2-dc2-true-pc4', 'pc1-ip1-dc1-false-pc3-ip2-dc2-true-pc4']
    },
    fettucineBolognese: {
        name: 'Fettucine Bolognese',
        description: 'Pasta with lines form a long flat. Topped with sauce bolognese.',
        photo: 'condition/spaghetti/fettucineBolognese.svg',
        unlock: ['ip1-pc1-dc1-false-pc3-ip2-dc2-false-pc5', 'pc1-ip1-dc1-false-pc3-ip2-dc2-false-pc5']
    }
};