// Generic Modal Functions
function generateListHTML(items) {
  return items.map(item => {
    if (typeof item === 'string') {
      return `<li>${item}</li>`;
    } else if (item.name && item.children) {
      return `<li><strong>${item.name}</strong>
        <ul>${generateListHTML(item.children)}</ul>
      </li>`;
    }
  }).join('');
}

function generateImgListHTML(items, targetId) {
  return items.map(item => {
    if (typeof item === 'string') {
      return `<li class="img-li"><button class="img-btn" onClick="document.getElementById('${targetId}').value = 'attacks/${item}'; closeModal();" title="${item}"><img src="imgs/attacks/${item}" alt="${item}"></button></li>`;
    } else if (item.name && item.children) {
      return `<li><strong>${item.name}</strong>
        <ul class="img-list">${generateImgListHTML(item.children, targetId)}</ul>
      </li>`;
    }
  }).join('');
}

function openModal(title, listData, targetId = '') {
  const modal = document.getElementById('genericModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPanel = document.getElementById('modalPanel');

  modalTitle.textContent = title;
  if (listData.length > 0) {
    modalPanel.innerHTML = `<ul>${targetId ? generateImgListHTML(listData, targetId) : generateListHTML(listData)}</ul>`;
  }
  modal.removeAttribute('hidden');
}

function addToBlockText(array) {
  for (const text of array){
    blockText += text + '\n';
  }
}

function generateUnitImgListHTML(level, onclick) {
  const ul = document.createElement('ul');
  ul.className = 'img-list';
  for (const unit of Object.values(unitsData)) {
    if (Number(unit.level) === level) {
      const li = document.createElement('li');
      li.className = 'img-li';
      
      const button = document.createElement('button');
      button.className = 'img-btn';
      button.onclick = () => {onclick(unit); closeModal();}
      button.title = unit.id;
      
      const img = document.createElement('img');
      img.src = `imgs/${unit.image}`;
      img.alt = unit.id;
      
      button.appendChild(img);
      li.appendChild(button);
      ul.appendChild(li);
    }
  };
  return ul;
}

function generateYourUnitImgListHTML(units, onclick) {
  const ul = document.createElement('ul');
  ul.className = 'img-list';
  for (const unit of Object.values(units)) {
      const li = document.createElement('li');
      li.className = 'img-li';
      
      const button = document.createElement('button');
      button.className = 'img-btn';
      button.onclick = () => {onclick(unit); closeModal();}
      button.title = unit.id;
      
      const img = document.createElement('img');
      img.src = `imgs/${unit.image}`;
      img.alt = unit.id;
      
      button.appendChild(img);
      li.appendChild(button);
      ul.appendChild(li);
  };
  return ul;
}

let recruitsElement

function addToFieldWithComas(value) {
  const field = recruitsElement
  if (field.value) {
    field.value += ',';
  }
  field.value += value.id;
}

function fillField(fieldValue) {
  const field = document.querySelector('[name="unitAdvancesTo"]');
  field.value = fieldValue.id;
}

function openUnitsModal(title, onClick, yours = false) {
  const modal = document.getElementById('genericModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPanel = document.getElementById('modalPanel');
  modalPanel.innerHTML = '';
  modalTitle.textContent = title;
  
  if (yours && selectedMod && data.mods[selectedMod.name].units) {
    const h3 = document.createElement('h3');
    h3.innerText = `Your Mod Units:`;
    modalPanel.appendChild(h3);
    modalPanel.appendChild(generateYourUnitImgListHTML(data.mods[selectedMod.name].units, onClick));

  }
  for (const x of [0,1,2,3,4]){
    const h3 = document.createElement('h3');
    h3.innerText = `Level ${x}`;
    modalPanel.appendChild(h3);
    modalPanel.appendChild(generateUnitImgListHTML(x, onClick));
  }
  modal.removeAttribute('hidden');
}

function closeModal() {
  document.getElementById('genericModal').setAttribute('hidden', 'true');
}

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
  const modal = document.getElementById('genericModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Races data structure
const racesData = [
  {
    name: 'The Six Main Races',
    children: [
      'Humans',
      'Elves',
      'Orcs',
      'Goblins',
      'Dwarves',
      'Undead',
      'Drakes',
      'Dunefolk'
    ]
  },
  {
    name: 'Other Races',
    children: [
      'Merfolk',
      'Nagas',
      'Ogres',
      'Saurians',
      'Trolls',
      'Woses',
      'Monsters'
    ]
  }
];

const movementTypesData = [
  {
    name: 'Default Movement Types',
    children: [
      'dunearmoredfoot', 'swimmer', 'dunefoot', 'undeadfly', 'dunehorse', 'dunearmoredhorse', 'armoredfoot', 'orcishfoot', 'woodland', 'deepsea', 'naga', 'float', 'gruefoot', 'dwarvishfoot', 'woodlandfloat', 'duneelusivefoot', 'drakeglide', 'rodentfoot', 'scuttlefoot', 'lightfly', 'treefolk', 'fly', 'undeadspirit', 'smallfly', 'drakefoot', 'largefoot', 'lizard', 'undeadfoot', 'elusivefoot', 'smallfoot', 'mounted', 'spirit', 'drakefly', 'drakeglide2', 'none', 'mountainfoot'
    ]
  }
]

const alignmentTypesData = [
  {
    name: 'Default Alignment Types',
    children: [
      'chaotic',
      'neutral',
      'lawful',
      'liminal'
    ]
  }
]

const attackTypesData = [
  {
    name: 'Default Attack Types',
    children: ['blade', 'cold', 'Naga', 'pierce', 'Giant', 'arcane', 'impact', 'fire']
  }
]

const attackSpecialsData = [
  {
    name: 'Default Attack Specials (Macro format) <a href="https://wiki.wesnoth.org/AbilitiesWML#The_.5Bspecials.5D_tag" target="_black">wiki descriptions</a>',
    children: ['{WEAPON_SPECIAL_PLAGUE}', '{WEAPON_SPECIAL_MARKSMAN}', '{WEAPON_SPECIAL_DRAIN}', '{WEAPON_SPECIAL_FIRSTSTRIKE}', '{WEAPON_SPECIAL_CHARGE}', '{WEAPON_SPECIAL_BERSERK}', '{WEAPON_SPECIAL_POISON}', '{WEAPON_SPECIAL_MAGICAL}', '{WEAPON_SPECIAL_BACKSTAB}', '{WEAPON_SPECIAL_SWARM}', '{WEAPON_SPECIAL_SLOW}', '{WEAPON_SPECIAL_DEFLECT}', '{WEAPON_SPECIAL_STUN}', 
      '<h4>Custom value example:</h4>', `[drains]
        <br>id=greater drains
        <br>name= _ "greater drains"
        <br>description= _ "This unit drains health from living units, healing itself for the full amount of damage it deals."
        <br>special_note={INTERNAL:SPECIAL_NOTES_DRAIN}
        <br>value=100
    <br>[/drains]`]
  }
]

const dieSoundsData = [
  {
    name: 'Default Die Sounds',
    children: ['{SOUND_LIST:HUMAN_OLD_DIE}', 'water-blast.wav', '{SOUND_LIST:ORC_DIE}', 'yeti-die.ogg', '{SOUND_LIST:ORC_SMALL_DIE}', 'wail-long.wav', '{SOUND_LIST:ELF_FEMALE_HIT}', 'ghoul-hit.wav', 'lich-die.ogg', 'skeleton-big-die', '{SOUND_LIST:DWARF_DIE}', '{SOUND_LIST:ZOMBIE_HIT}', '{SOUND_LIST:SKELETON_DIE}', 'bat-flapping.wav', 'naga-die.ogg', 'mermen-die.ogg', 'tusker-die.ogg', 'horse-die.ogg', '{SOUND_LIST:GRYPHON_DIE}', '{SOUND_LIST:HUMAN_DIE}', 'drake-die.ogg', '{SOUND_LIST:ZOMBIE_WEAK_HIT}', '{SOUND_LIST:HUMAN_FEMALE_DIE}', 
    'mermaid-die.ogg', '{SOUND_LIST:TROLL_DIE}', '{SOUND_LIST:ELF_HIT}', 'hiss-die.wav', '{SOUND_LIST:GOBLIN_DIE}', 'wose-die.ogg', 'squishy-hit.wav', '{SOUND_LIST:OGRE_DIE}', 'hiss-big.wav', '{SOUND_LIST:WOLF_DIE}']
  }
];

const abilitiesData = [
  {
    name: 'Default Abilities (Macro format) <a href="https://wiki.wesnoth.org/AbilitiesWML#The_.5Babilities.5D_tag" target="_black">wiki descriptions</a>',
    children: ['{ABILITY_CONCEALMENT}', '{ABILITY_ILLUMINATES HALO="halo/illuminates-aura.png"}', '{ABILITY_FEEDING}', '{ABILITY_AMBUSH}', '{ABILITY_REGENERATES}', '{ABILITY_BURROW}', '{ABILITY_SELF_HEAL}', '{ABILITY_TELEPORT}', '{ABILITY_DIVERSION}', '{ABILITY_CURES}', '{ABILITY_HEALS}', '{ABILITY_SKIRMISHER}', '{ABILITY_STEADFAST}', '{ABILITY_LEADERSHIP}', '{ABILITY_EXTRA_HEAL}', '{ABILITY_NIGHTSTALK}', '{ABILITY_SUBMERGE}']
  }
];

const usageData = [
  {
    name: 'The type of unit the AI will use when selecting usage order in the era, default ones:',
    children: ['scout', 'figher', 'archer', 'mixed fighter', 'healer']
  }
];

const attacksData = [
  {
    name: 'Default Attacks',
    children: ['axe-crude.png',
      'axe-deathblade.png',
      'axe-undead.png',
      'axe.png',
      'ballista.png',
      'baneblade.png',
      'battleaxe-undead.png',
      'battleaxe.png',
      'beak.png',
      'blade-curved.png',
      'blank-attack.png',
      'blank-border.png',
      'blowgun.png',
      'bolas.png',
      'bow-elven-magic.png',
      'bow-elven.png',
      'bow-orcish.png',
      'bow-short-reinforced.png',
      'bow-short.png',
      'bow.png',
      'chakram.png',
      'chakri.png',
      'claws-animal.png',
      'claws-drake.png',
      'claws-fire-elemental.png',
      'claws-flaming.png',
      'claws-shadow.png',
      'claws-undead.png',
      'claws.png',
      'cleaver.png',
      'club-small.png',
      'club.png',
      'crossbow-human.png',
      'crossbow-iron.png',
      'crossbow-orcish.png',
      'crossbow-undead.png',
      'crush-wose.png',
      'curse.png',
      'dagger-curved.png',
      'dagger-human.png',
      'dagger-orcish.png',
      'dagger-thrown-human.png',
      'dagger-thrown-poison-human.png',
      'dagger-thrown-poison-orcish.png',
      'dagger-undead.png',
      'dark-missile.png',
      'dragonstaff.png',
      'druidstaff.png',
      'entangle.png',
      'faerie-fire.png',
      'fangs-angler.png',
      'fangs-animal.png',
      'fangs-ant.png',
      'fangs-bug.png',
      'fangs-horse.png',
      'fangs-rodent.png',
      'fangs-snake.png',
      'fangs-spider.png',
      'fangs.png',
      'fire-blast.png',
      'fire-breath-drake.png',
      'fireball.png',
      'fist-human.png',
      'fist-merman.png',
      'fist-skeletal.png',
      'fist-troll.png',
      'fist-yeti.png',
      'fist.png',
      'foot-bare.png',
      'foot-boot.png',
      'foot-shoe.png',
      'frenzy.png',
      'gaze.png',
      'glaive.png',
      'greatsword-elven.png',
      'greatsword-human.png',
      'greatsword-orcish.png',
      'halberd.png',
      'hammer-dwarven-runic.png',
      'hammer-dwarven.png',
      'hammer-troll.png',
      'hammer.png',
      'hatchet.png',
      'heater-shield.png',
      'hoof-nightmare.png',
      'hoof-skeletal.png',
      'hoof.png',
      'iceball.png',
      'ink.png',
      'javelin-human.png',
      'javelin-orcish.png',
      'kelp.png',
      'lance.png',
      'lightbeam.png',
      'lightning.png',
      'longsword.png',
      'mace-and-chain.png',
      'mace-spiked.png',
      'mace-spiked2.png',
      'mace.png',
      'magic-missile.png',
      'morning-star.png',
      'mud-glob.png',
      'mud-missile.png',
      'net.png',
      'pick-axe.png',
      'pike.png',
      'pincers.png',
      'pitchfork.png',
      'quarterstaff.png',
      'ram.png',
      'rectangular-shield.png',
      'rock_thrown.png',
      'saber-human.png',
      'scarab-horn.png',
      'scimitar.png',
      'scythe.png',
      'sickle.png',
      'slam-drake.png',
      'sling.png',
      'slingshot.png',
      'spear-orcish.png',
      'spear-simple.png',
      'spear-thrown.png',
      'spear.png',
      'staff-elven-star.png',
      'staff-elven.png',
      'staff-green.png',
      'staff-magic.png',
      'staff-necromantic.png',
      'staff-plague.png',
      'staff-ruby.png',
      'sting.png',
      'stinger-dragonfly.png',
      'sword-elven.png',
      'sword-flaming.png',
      'sword-holy.png',
      'sword-human-short.png',
      'sword-human.png',
      'sword-orcish.png',
      'sword-steel.png',
      'tail-dragon.png',
      'tail-merman.png',
      'tail-monax.png',
      'tekko.png',
      'tentacle.png',
      'thorns.png',
      'thunderstick.png',
      'torch.png',
      'touch-faerie.png',
      'touch-undead.png',
      'touch-zombie.png',
      'trident.png',
      'trident2-blade.png',
      'trident2-pierce.png',
      'trishula.png',
      'tusk.png',
      'wail.png',
      'warblade-red.png',
      'warblade.png',
      'waterspray.png',
      'web.png',
      'whip.png',
      'woodensword.png'
    ]
  }
]

