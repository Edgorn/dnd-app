
import mountainDwarf from '../../data/imagenes/mountain-dwarf.jpg'
import hillDwarf from '../../data/imagenes/hill-dwarf.jpg'
import sunElf from '../../data/imagenes/sun-elf.jpg'
import moonElf from '../../data/imagenes/moon-elf.jpg'
import woodElf from '../../data/imagenes/wood-elf.jpg'
import darkElf from '../../data/imagenes/dark-elf.jpg'
import lightfootHalfling from '../../data/imagenes/lightfoot-halfling.jpg'
import stoutHalfling from '../../data/imagenes/stout-halfling.jpg'
import human from '../../data/imagenes/human.jpg'
import dragonbornBlue from '../../data/imagenes/dragonborn-blue.jpg'
import dragonbornWhite from '../../data/imagenes/dragonborn-white.jpg'
import dragonbornBronze from '../../data/imagenes/dragonborn-bronze.jpg'
import dragonbornCopper from '../../data/imagenes/dragonborn-copper.jpg'
import dragonbornBlack from '../../data/imagenes/dragonborn-black.jpg'
import dragonbornGold from '../../data/imagenes/dragonborn-gold.jpg'
import dragonbornBrass from '../../data/imagenes/dragonborn-brass.jpg'
import dragonbornSilver from '../../data/imagenes/dragonborn-silver.jpg'
import dragonbornRed from '../../data/imagenes/dragonborn-red.jpg'
import dragonbornGreen from '../../data/imagenes/dragonborn-green.jpg'
import rockGnome from '../../data/imagenes/rock-gnome.jpg'
import forestGnome from '../../data/imagenes/forest-gnome.jpg'
import halfElf from '../../data/imagenes/half-elf.jpg'
import halfOrc from '../../data/imagenes/half-orc.jpg'
import tiefling from '../../data/imagenes/tiefling.jpg'

import bard from '../../data/imagenes/bard.jpg'
import warlock from '../../data/imagenes/warlock.jpg'
import barbarian from '../../data/imagenes/barbarian.jpg'
import cleric from '../../data/imagenes/cleric.jpg'
import druid from '../../data/imagenes/druid.jpg'
import ranger from '../../data/imagenes/ranger.jpg'
import fighter from '../../data/imagenes/fighter.jpg'
import sorcerer from '../../data/imagenes/sorcerer.jpg'
import wizard from '../../data/imagenes/wizard.jpg'
import monk from '../../data/imagenes/monk.jpg'
import paladin from '../../data/imagenes/paladin.jpg'
import rogue from '../../data/imagenes/rogue.jpg'
import fairyLord from '../../data/imagenes/fairy-lord.jpg'
import infernal from '../../data/imagenes/infernal.jpg'
import primal from '../../data/imagenes/primal.jpg'

export default function Imagen({ index }) {

  const imagenes = {
    dwarf: mountainDwarf,
    "mountain-dwarf":  mountainDwarf,
    "hill-dwarf":  hillDwarf,
    elf: sunElf,
    "high-elf": sunElf,
    "wood-elf": woodElf,
    "dark-elf": darkElf,
    "Alto elfo solar": sunElf,
    "Alto elfo lunar": moonElf,
    "halfling": lightfootHalfling,
    "lightfoot-halfling": lightfootHalfling,
    "stout-halfling": stoutHalfling,
    "human": human,
    "dragonborn": dragonbornRed,
    "draconic-ancestry-blue": dragonbornBlue,
    "draconic-ancestry-white": dragonbornWhite,
    "draconic-ancestry-bronze": dragonbornBronze,
    "draconic-ancestry-copper": dragonbornCopper,
    "draconic-ancestry-black": dragonbornBlack,
    "draconic-ancestry-gold": dragonbornGold,
    "draconic-ancestry-brass": dragonbornBrass,
    "draconic-ancestry-silver": dragonbornSilver,
    "draconic-ancestry-red": dragonbornRed,
    "draconic-ancestry-green": dragonbornGreen,
    "gnome": rockGnome,
    "rock-gnome": rockGnome,
    "forest-gnome": forestGnome,
    "half-elf": halfElf,
    "half-orc": halfOrc,
    "tiefling": tiefling,
    bard: bard,
    warlock: warlock,
    barbarian: barbarian,
    cleric: cleric,
    druid: druid,
    ranger: ranger,
    fighter: fighter,
    sorcerer: sorcerer,
    wizard: wizard,
    monk: monk,
    paladin: paladin,
    rogue: rogue,
    "fairy-lord": fairyLord,
    infernal: infernal,
    primal: primal
  }

  return <img src={imagenes[index]} alt={index} />
}