addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P*", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffff5580",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
        if (hasMilestone('p', 0)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
    11: {
        title: "Start from zero",
        description: "Start Generating Points",
        cost: new Decimal(0),
    },
    12: {
        title: "Test735",
        description: "second upgrade",
        unlocked(){return (hasUpgrade(this.layer, 11))},
        cost: new Decimal(1),
         effect() {
        return player[this.layer].points.add(1).pow(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    22: {
       title: "Test737",
        description: "third upgrade",
        unlocked(){return (hasUpgrade(this.layer, 12))},
        cost: new Decimal(1),
         effect() {
        return player.points.add(1).pow(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
    },
    },
    milestones: {
        0: {
            requirementDescription: "20 Points",
            effectDescription: "2x Prestiege Points",
            done() { return player.points.gte(50) },
            style(){return{"width":"45vw"}},
        },
    },
    bars: {
        "P*MileBar": {
            direction: RIGHT,
            width: 500,
            height: 20,
            borderStyle() {return {'border-width': "1px"},{'border-radius':"0px"}},
            progress() {return 0.5}
        },
    },
    tabFormat: {
        "Main": {
            content:[
            "main-display","prestige-button","resource-display","h-line","blank","upgrades","blank",
            ]
        },
        "Milestone": {
            content:[
            ["bar","P*MileBar"],"blank",
            "milestones",
            ]
        },
    },
}),
addLayer("q", {
    name: "prestige2test", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#8400ffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige2 points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player["p"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, 
    resetsNothing() {return false},
    layerShown(){return true},
    
}),
addLayer("Test", {
    name: "TestandControls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "???", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(2),
    }},
    color: "#ffaa55",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    type:"none",
    resource:"H",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
    11: {
        title: "Reset",
        description: "Warning: will reset "+"??? and P*",
        unlocked(){return (!hasUpgrade(this.layer, 11)) },
        cost: new Decimal(0),
    },
    12: {
        title: "Confirm Reset",
        description: "Warning: will reset "+"??? and P*",
        style() {if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#4d4d4dff' 
                    } 
                    else return {
                            'background-color':'#d76161ff'  
                        } },
        unlocked(){return (hasUpgrade(this.layer, 11)) },
        onPurchase(){layerDataReset(this.layer),layerDataReset("p")},
        cost: new Decimal(0),
    },
},
    bars: {
            H: {
                fillStyle: {'background-color' : "#FFFFFF"},
                baseStyle: {'background-color' : "#000000ff"},
                textStyle: {'color': '#04e050'},
                borderStyle() {return {'border-radius': "0px"}},
                direction: DOWN,
                width: 50,
                height: 200,
                progress() {
                    return (player.points).toNumber()
                },
                display() {
                    return format(player.points) + " / 1e10 points"
                },
                unlocked: true,

            },
        },
    tabFormat: {
        "Test": {
            content:[
            "upgrades","blank",
            ["bar","H"]
            ]
        },
    },
})
