let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : { mods: {} };

let selectedMod = localStorage.getItem('selectedMod') ? data.mods[localStorage.getItem('selectedMod')] : null;
let selectedUnit = {};
if (selectedMod) {
  selectedUnit = localStorage.getItem('selectedUnit') ? selectedMod.units[localStorage.getItem('selectedUnit')] : {};
}
let currentPage = 'mainPage';
let blockText = '';


function createMod() {
  const modName = prompt("Enter the name of the new mod:");
  if (modName && !data.mods[modName]) {
    data.mods[modName] = { name: modName, description: `Description for ${modName}`, units: {} };
    populateModList();
    localStorage.setItem('data', JSON.stringify(data));
  }
}

function populateListBase(listId, items, onClick, deleteFunc) {
  const list = document.getElementById(listId);
  if (!list) {
    // No list present on this page — nothing to populate.
    return;
  }
  list.innerHTML = '';
  items.forEach((mod, index) => {
    let li = document.createElement('li');
    if (mod.image) {
      const img = document.createElement('img');
      img.src = 'imgs/' + mod.image;
      img.style.width = '72px';
      img.style.margin = '-8px';
      li.appendChild(img);
    }
    let button = document.createElement('button');
    let trash = document.createElement('button');
    trash.innerText = '🗑️';
    trash.classList.add('trash-button');
    trash.onclick = () => deleteFunc(mod);
    button.innerText = mod.name;
    // change the target page id to one that actually exists in your HTML,
    // or create a page with id "modDetailsPage" in your HTML.
    button.onclick = () => onClick(mod);
    li.appendChild(button);
    li.appendChild(trash);
    list.appendChild(li);
  });
}
function populateModList() {
  const modList = Object.values(data.mods);

  populateListBase('modsList', modList, (mod) => {
    selectedMod = mod;
    localStorage.setItem('selectedMod', mod.name);
    showPage('modDetailsPage');
  },
  (mod) => {
    if (confirm(`Are you sure you want to delete mod "${mod.name}"? This action cannot be undone.`)) {
      delete data.mods[mod.name];
      localStorage.setItem('data', JSON.stringify(data));
      populateModList();
    }
  });
}

function populateUnitList() {
  const unitsList = Object.values(selectedMod.units);
  populateListBase('unitsList', unitsList, (unit) => {
    selectedUnit = unit;
    localStorage.setItem('selectedUnit', unit.id);
    showPage('UnitPage');
  },
  (unit) => {
    if (confirm(`Are you sure you want to delete unit "${unit.name}"? This action cannot be undone.`)) {
      delete selectedMod.units[unit.id];  
      populateUnitList();
    }
  });
}

function populateUnitForm() {
  const unitForm = document.getElementById('UnitForm');
  if (!unitForm || !selectedUnit) return;

  // Fill basic fields
  document.getElementById('unitName').value = selectedUnit.name || '';
  document.getElementById('unitRace').value =  (selectedUnit.race || '').toLowerCase();
  document.getElementById('unitDefaultAnimation').value = selectedUnit.unitDefaultAnimation || 'No';
  document.getElementById('unitImage').value = selectedUnit.image || '';
  document.getElementById('unitProfile').value = selectedUnit.profile || '';
  document.getElementById('unitHitpoints').value = selectedUnit.hitpoints || '';
  document.getElementById('unitMovement').value = selectedUnit.movement || '';
  document.getElementById('unitMovementType').value = selectedUnit.movement_type || '';
  document.getElementById('unitCost').value = selectedUnit.cost || '';
  document.getElementById('unitLevel').value = selectedUnit.level || '';
  document.getElementById('unitExperience').value = selectedUnit.experience || '';
  document.getElementById('unitAlignment').value = selectedUnit.alignment || '';
  document.getElementById('unitAdvancesTo').value = selectedUnit.advances_to || '';
  document.getElementById('unitDescription').value = selectedUnit.description || '';
  document.getElementById('unitUsage').value = selectedUnit.usage || '';
  document.getElementById('unitDieSound').value = selectedUnit.die_sound || '';

  // Clear and populate attacks
  document.getElementById('attacksContainer').innerHTML = '';
  if (selectedUnit.attacks && selectedUnit.attacks.length > 0) {
    selectedUnit.attacks.forEach((attack, index) => {
      addAttack();
      const attackDiv = document.querySelectorAll('#attacksContainer > div')[index];
      attackDiv.querySelector('.attack-name').value = attack.name || '';
      attackDiv.querySelector('.attack-description').value = attack.description || '';
      attackDiv.querySelector('.attack-icon').value = attack.icon || '';
      attackDiv.querySelector('.attack-type').value = attack.type || '';
      attackDiv.querySelector('.attack-range').value = attack.range || '';
      attackDiv.querySelector('.attack-damage').value = attack.damage || '';
      attackDiv.querySelector('.attack-number').value = attack.number || '';
      attackDiv.querySelector('.attack-number').value = attack.number || '';
      // Populate abilities
      const attackAbilities = attack.abilities || [];
      if (attackAbilities.length > 0) {
        attackDiv.querySelector('.attack-abilities').value = attackAbilities.join('\n');
      } else {
        attackDiv.querySelector('.attack-abilities').value = '';
      }
    });
  }

  // Clear and populate resistances
  document.getElementById('resistanceContainer').innerHTML = '';
  if (selectedUnit.resistance && Object.keys(selectedUnit.resistance).length > 0) {
    Object.entries(selectedUnit.resistance).forEach(([type, value]) => {
      addResistance();
      const resistDiv = document.querySelectorAll('#resistanceContainer > div');
      const lastResist = resistDiv[resistDiv.length - 1];
      lastResist.querySelector('.resistance-type').value = type;
      lastResist.querySelector('.resistance-value').value = value;
    });
  }

  // Populate abilities
  if (selectedUnit.abilities && selectedUnit.abilities.length > 0) {
    document.getElementById('unitAbilities').value = selectedUnit.abilities.join('\n');
  } else {
    document.getElementById('unitAbilities').value = '';
  }

  // Populate standing animation
  document.getElementById('standingAnimContainer').innerHTML = '';
  document.getElementById('standingStartTime').value = (selectedUnit.standing_anim && selectedUnit.standing_anim.start_time) || '';
  if (selectedUnit.standing_anim && Array.isArray(selectedUnit.standing_anim.frames)) {
    selectedUnit.standing_anim.frames.forEach((frame) => {
      addStandingFrame();
      const frames = document.querySelectorAll('#standingAnimContainer > div');
      const last = frames[frames.length - 1];
      last.querySelector('.standing-frame-image').value = frame.image || '';
    });
  }

  // Populate attack animations
  document.getElementById('attackAnimsContainer').innerHTML = '';
  if (selectedUnit.attack_anims && Array.isArray(selectedUnit.attack_anims)) {
    selectedUnit.attack_anims.forEach((anim) => {
      addAttackAnim();
      const animDivs = document.querySelectorAll('#attackAnimsContainer > div');
      const lastAnim = animDivs[animDivs.length - 1];
      lastAnim.querySelector('.anim-filter-name').value = (anim.filter_attack && anim.filter_attack.name) || '';
      lastAnim.querySelector('.anim-missile-start-time').value = anim.missile_start_time || '';
      lastAnim.querySelector('.anim-start-time').value = anim.start_time || '';

      // missile frame
      if (anim.missile_frame) {
        addMissileFrame(lastAnim.id);
        const mf = lastAnim.querySelector('.missileFrameContainer > div');
        if (mf) {
          mf.querySelector('.missile-duration').value = anim.missile_frame.duration || '';
          mf.querySelector('.missile-image').value = anim.missile_frame.image || '';
          mf.querySelector('.missile-image-diagonal').value = anim.missile_frame.image_diagonal || '';
        }
      }

      // frames
      if (anim.frames && Array.isArray(anim.frames)) {
        anim.frames.forEach((frame) => {
          addAttackAnimFrame(lastAnim.id);
          const frames = lastAnim.querySelectorAll('.anim-frame');
          const lastFrame = frames[frames.length - 1];
          lastFrame.querySelector('.anim-frame-image').value = frame.image || '';
        });
      }
    });
  }
}

function populateEraList() {
  const eraContainer = document.getElementById('eraFramesContainer');
  if (!eraContainer || !selectedMod) return;
  
  // Clear existing era frames
  eraContainer.innerHTML = '';
  
  // Populate eras if they exist
  if (selectedMod.eras && selectedMod.eras.length > 0) {
    selectedMod.eras.forEach(era => {
      addEraFrame();
      const eraDivs = eraContainer.querySelectorAll(':scope > div');
      const eraDiv = eraDivs[eraDivs.length - 1];
      
      // Fill era fields
      let name = eraDiv.querySelector('[name="eraName"]');
      name.value = era.name || '';
      var event = new Event('change');
      name.dispatchEvent(event);
      eraDiv.querySelector('[name="defaultFactions"]').checked = era.defaultFactions || false;
      
      // Populate factions
      if (era.factions && era.factions.length > 0) {
        era.factions.forEach(faction => {
          addFaction(eraDiv.id);
          const factionDivs = eraDiv.querySelectorAll('.factionContainer > .faction-frame');
          const factionDiv = factionDivs[factionDivs.length - 1];
          
          // Fill faction fields
          factionDiv.querySelector('[name="factionName"]').value = faction.name || '';
          factionDiv.querySelector('[name="factionImage"]').value = faction.image || '';
          factionDiv.querySelector('[name="factionType"]').value = faction.type || '';
          factionDiv.querySelector('[name="factionLeaders"]').value = faction.leaders || '';
          factionDiv.querySelector('[name="factionRecruits"]').value = faction.recruits || '';
          factionDiv.querySelector('[name="factionAI"]').value = faction.ai || '';
        });
      }
    });
  }
}

function showPage(pageid) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.hidden = true;
  });

  const target = document.getElementById(pageid);
  if (!target) {
    console.warn(`showPage: no element with id "${pageid}" found`);
    return;
  }
  switch (pageid) {
    case 'mainPage':
      populateModList();
      selectedMod = null;
      localStorage.setItem('selectedMod', null);
      break;
    case 'unitsPage':
      populateUnitList();
      selectedUnit = null;
      localStorage.setItem('selectedUnit', null);
      break;
    case 'UnitPage':
      populateUnitForm();
      break;
    case 'erasPage':
      populateEraList();
      break;
    case 'modDetailsPage':
      document.getElementById('modName').innerText = localStorage.getItem('selectedMod') || 'No Mod Selected';
  }
  target.hidden = false;
  localStorage.setItem('lastPage', pageid);
}

// Attack counter for unique IDs
let attackCounter = 0;
let resistanceCounter = 0;

function addAttack() {
  const container = document.getElementById('attacksContainer');
  const attackId = `attack_${attackCounter++}`;
  
  const div = document.createElement('div');
  div.id = attackId;
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '10px';
  div.style.margin = '10px 0';
  div.innerHTML = `
    <h4>Attack ${attackCounter}</h4>
    <label>Name:</label>
    <input type="text" class="attack-name" placeholder="Sword">
    <br>
    <label>Description:</label>
    <input type="text" class="attack-description" placeholder="A sharp blade">
    <br>
    <label>Icon:<button type="button" class="info-icon" onclick="openModal('Attack Icon Information', attacksData, 'attackIconInput')" title="View Attack Icon information">ℹ️</button></label>
    <input type="text" id="attackIconInput" class="attack-icon" placeholder="attacks/sword.png">
    <br>
    <label>Type:<button type="button" class="info-icon" onclick="openModal('Attack Types Information', attackTypesData)" title="View Attack types information">ℹ️</button></label>
    <input type="text" class="attack-type" placeholder="blade">
    <br>
    <label>Range:</label>
    <select type="text" class="attack-range" placeholder="melee">
      <option value="melee">Melee</option>
      <option value="ranged">Ranged</option>
    </select>
    <br>
    <label>Damage:</label>
    <input type="number" class="attack-damage" placeholder="10">
    <br>
    <label>Number of Attacks:</label>
    <input type="number" class="attack-number" placeholder="2">
    <br>
    <label for="attackAbilities">Abilities 
    (one per line):<button type="button" class="info-icon" onclick="openModal('Attack Ability Information', attackSpecialsData)" title="View Attack Ability information">ℹ️</button></label>
    <textarea id="attackAbilities" name="attackAbilities" placeholder="{WEAPON_SPECIAL_MAGICAL}" class="attack-abilities" ></textarea>
    <br>
    <button type="button" onclick="removeAttack('${attackId}')">Remove Attack</button>
  `;
  container.appendChild(div);
}

function removeAttack(attackId) {
  document.getElementById(attackId).remove();
}

function addResistance() {
  const container = document.getElementById('resistanceContainer');
  const resistanceId = `resistance_${resistanceCounter++}`;
  
  const div = document.createElement('div');
  div.id = resistanceId;
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '10px';
  div.style.margin = '10px 0';
  div.innerHTML = `
    <label>Type:</label>
    <input type="text" class="resistance-type" placeholder="e.g., blade" required>
    <label>Value:</label>
    <input type="number" class="resistance-value" placeholder="60" required>
    <button type="button" onclick="removeResistance('${resistanceId}')">Remove</button>
  `;
  container.appendChild(div);
}

function removeResistance(resistanceId) {
  document.getElementById(resistanceId).remove();
}
// Animation helpers
function addStandingFrame() {
  const container = document.getElementById('standingAnimContainer');
  const id = `standing_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'standing-frame';
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Image:</label>
    <input type="text" class="standing-frame-image" placeholder="units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]">
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addAttackAnim() {
  const container = document.getElementById('attackAnimsContainer');
  const animId = `attack_anim_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = animId;
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '8px';
  div.style.margin = '8px 0';
  div.innerHTML = `
    <h4>Attack Anim</h4>
    <label>Filter Attack Name:</label>
    <input type="text" class="anim-filter-name" placeholder="attack name">
    <br>
    <label>Missile Start Time:</label>
    <input type="number" class="anim-missile-start-time">
    <div class="missileFrameContainer"></div>
    <button type="button" onclick="addMissileFrame('${animId}')">Add Missile Frame</button>
    <br>
    <label>Start Time:</label>
    <input type="number" class="anim-start-time">
    <br>
    <div class="animFramesContainer"></div>
    <button type="button" onclick="addAttackAnimFrame('${animId}')">Add Frame</button>
    <br>
    <button type="button" onclick="removeAttackAnim('${animId}')">Remove Anim</button>
  `;
  container.appendChild(div);
}

function removeAttackAnim(animId) {
  const el = document.getElementById(animId);
  if (el) el.remove();
}

function addAttackAnimFrame(animId) {
  const animDiv = document.getElementById(animId);
  if (!animDiv) return;
  const container = animDiv.querySelector('.animFramesContainer');
  const id = `anim_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'anim-frame';
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Image:</label>
    <input type="text" class="anim-frame-image" placeholder="frames/frame.png">
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addMissileFrame(animId) {
  const animDiv = document.getElementById(animId);
  if (!animDiv) return;
  const container = animDiv.querySelector('.missileFrameContainer');
  const id = `missile_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Duration:</label>
    <input type="number" class="missile-duration">
    <label>Image:</label>
    <input type="text" class="missile-image">
    <label>Image Diagonal:</label>
    <input type="text" class="missile-image-diagonal">
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addEraFrame() {
  const container = document.getElementById('eraFramesContainer');
  const id = `era_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.style.margin = '6px 0';
  div.innerHTML = `
    <h2 id="eraTitle_${id}">Era</h2>
    <label for="eraName">Name:</label>
    <input type="text" Name="eraName" name="eraName" onChange="document.getElementById('eraTitle_${id}').textContent = 'Era: ' + this.value;" required>
    <br>
    <br>
    <label for="defaultFactions">Add default factions:</label>
    <input type="checkbox" id="defaultFactions" name="defaultFactions">
    <div class="factionContainer"></div>

    <button type="button" style="margin: 6px 0;" onclick="addFaction('${id}')">Add Faction</button>
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove Era</button>
  `;
  container.appendChild(div);
}

function addFaction(eraId) {
  const eraDiv = document.getElementById(eraId);
  if (!eraDiv) return;
  const container = eraDiv.querySelector('.factionContainer');
  const id = `faction_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('faction-frame');
  div.innerHTML = `
    <h3>Faction</h3>
    <label for="factionName">Name:</label>
    <input type="text" Name="factionName" name="factionName" required>
    <label for="factionImage">Image Path:</label>
    <input type="text" Name="factionImage" name="factionImage" placeholder="units/monsters/boar/piglet.png">
    <label for="factionType">Type:(Cosmetic)</label>
    <input type="text" Name="factionType" name="factionType" placeholder="Chaotic,Neutral or Lawful">
    <label for="factionLeaders">Leaders:</label>
    <input type="text" Name="factionLeaders" name="factionLeaders" placeholder="Ghost,Ghoul or Ghost">
    <label for="factionRecruits">Recruits:<button type="button" class="info-icon" onclick="openUnitsModal('Add By Image', addToFieldWithComas, true)" title="Add By Image">ℹ️</button></label>
    <input type="text" Name="factionRecruits" name="factionRecruits" placeholder="Ghost,Ghoul or Ghost">
    <label for="factionAI">AI recruit order: (usage field of units)</label>
    <input type="text" Name="factionAI" name="factionAI" placeholder="fighter,scout,archer">
    <br>
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove Faction</button>
  `;
  container.appendChild(div);
}

function saveEra() {
  const eraContainer = document.getElementById('eraFramesContainer');
  if (!eraContainer || !selectedMod) return;
  
  const eras = [];
  
  // Iterate through each era div
  eraContainer.querySelectorAll(':scope > div').forEach(eraDiv => {
    const eraName = eraDiv.querySelector('[name="eraName"]').value;
    const eraId = eraName;
    const defaultFactions = eraDiv.querySelector('[name="defaultFactions"]').checked;
    
    if (!eraId || !eraName) return; // Skip empty eras
    
    const factions = [];
    
    // Iterate through each faction in this era
    eraDiv.querySelectorAll('.factionContainer > .faction-frame').forEach(factionDiv => {
      const factionName = factionDiv.querySelector('[name="factionName"]').value;
      const factionId = factionName;
      const factionImage = factionDiv.querySelector('[name="factionImage"]').value?.replace(/\\\\/, '/').replace(/\\/g, '/');
      const factionType = factionDiv.querySelector('[name="factionType"]').value;
      const factionLeaders = factionDiv.querySelector('[name="factionLeaders"]').value;
      const factionRecruits = factionDiv.querySelector('[name="factionRecruits"]').value;
      const factionAI = factionDiv.querySelector('[name="factionAI"]').value;
      
      if (!factionId || !factionName) return; // Skip empty factions
      
      const faction = {
        id: factionId,
        name: factionName
      };
      
      if (factionImage) faction.image = factionImage;
      if (factionType) faction.type = factionType;
      if (factionLeaders) faction.leaders = factionLeaders;
      if (factionRecruits) faction.recruits = factionRecruits;
      if (factionAI) faction.ai = factionAI;
      
      factions.push(faction);
    });
    
    const era = {
      id: eraId,
      name: eraName,
      defaultFactions: defaultFactions,
      factions: factions
    };
    
    eras.push(era);
  });
  
  // Save eras to selected mod
  if (eras.length > 0) {
    selectedMod.eras = eras;
  } else {
    delete selectedMod.eras; // Remove if no eras
  }
  
  // Persist to localStorage
  localStorage.setItem('data', JSON.stringify(data));
  alert('Eras saved:', eras);
}

// Handle unit form submission
document.addEventListener('DOMContentLoaded', function() {
  const unitForm = document.getElementById('UnitForm');
  if (unitForm) {
    unitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(unitForm);
      const newUnit = {
        id: formData.get('unitName'),
        name: formData.get('unitName'),
        race: formData.get('unitRace') || null,
        unitDefaultAnimation: formData.get('unitDefaultAnimation') || null,
        image: formData.get('unitImage') || null,
        profile: formData.get('unitProfile') || null,
        hitpoints: formData.get('unitHitpoints') ? parseInt(formData.get('unitHitpoints')) : null,
        movement: formData.get('unitMovement') ? parseInt(formData.get('unitMovement')) : null,
        movement_type: formData.get('unitMovementType') || null,
        cost: formData.get('unitCost') ? parseInt(formData.get('unitCost')) : null,
        level: formData.get('unitLevel') ? parseInt(formData.get('unitLevel')) : null,
        experience: formData.get('unitExperience') ? parseInt(formData.get('unitExperience')) : null,
        alignment: formData.get('unitAlignment') || null,
        advances_to: formData.get('unitAdvancesTo') || null,
        description: formData.get('unitDescription') || null,
        usage: formData.get('unitUsage') || null,
        die_sound: formData.get('unitDieSound') || null
      };

      // Collect attacks
      const attacks = [];
      document.querySelectorAll('#attacksContainer > div').forEach(attackDiv => {
        const abilitiesText = attackDiv.querySelector('.attack-abilities').value || '';
        const abilities = abilitiesText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line);
        const attack = {
          name: attackDiv.querySelector('.attack-name').value || null,
          description: attackDiv.querySelector('.attack-description').value || null,
          icon: attackDiv.querySelector('.attack-icon').value || null,
          type: attackDiv.querySelector('.attack-type').value || null,
          range: attackDiv.querySelector('.attack-range').value || null,
          damage: attackDiv.querySelector('.attack-damage').value ? parseInt(attackDiv.querySelector('.attack-damage').value) : null,
          number: attackDiv.querySelector('.attack-number').value ? parseInt(attackDiv.querySelector('.attack-number').value) : null,
          abilities: abilities || null
        };
        if (attack.name || attack.id) attacks.push(attack);
      });
      if (attacks.length > 0) newUnit.attacks = attacks;

      // Collect resistance
      const resistance = {};
      document.querySelectorAll('#resistanceContainer > div').forEach(resistDiv => {
        const type = resistDiv.querySelector('.resistance-type').value;
        const value = resistDiv.querySelector('.resistance-value').value;
        if (type && value) {
          resistance[type] = parseInt(value);
        }
      });
      if (Object.keys(resistance).length > 0) newUnit.resistance = resistance;

      // Collect abilities
      const abilitiesText = formData.get('unitAbilities') || '';
      const abilities = abilitiesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);
      if (abilities.length > 0) newUnit.abilities = abilities;

      // Collect BlockAnim
      if (blockText){
        newUnit.blockAnimations = blockText;
        blockText = '';
      }

      // Collect standing animation
      const standingStart = document.getElementById('standingStartTime').value;
      const standingFrames = [];
      document.querySelectorAll('#standingAnimContainer > .standing-frame').forEach(frDiv => {
        const img = frDiv.querySelector('.standing-frame-image').value;
        if (img) standingFrames.push({ image: img });
      });
      if (standingStart || standingFrames.length > 0) {
        newUnit.standing_anim = {};
        if (standingStart) newUnit.standing_anim.start_time = parseInt(standingStart);
        if (standingFrames.length > 0) newUnit.standing_anim.frames = standingFrames;
      }

      // Collect attack animations
      const attackAnims = [];
      document.querySelectorAll('#attackAnimsContainer > div').forEach(animDiv => {
        const anim = {};
        const filterName = animDiv.querySelector('.anim-filter-name').value;
        if (filterName) anim.filter_attack = { name: filterName };
        const msStart = animDiv.querySelector('.anim-missile-start-time').value;
        if (msStart) anim.missile_start_time = parseInt(msStart);
        const startTime = animDiv.querySelector('.anim-start-time').value;
        if (startTime) anim.start_time = parseInt(startTime);

        // missile frame (first only)
        const mf = animDiv.querySelector('.missileFrameContainer > div');
        if (mf) {
          const missile = {};
          const dur = mf.querySelector('.missile-duration').value;
          const img = mf.querySelector('.missile-image').value;
          const imgd = mf.querySelector('.missile-image-diagonal').value;
          if (dur) missile.duration = parseInt(dur);
          if (img) missile.image = img;
          if (imgd) missile.image_diagonal = imgd;
          if (Object.keys(missile).length > 0) anim.missile_frame = missile;
        }

        // frames
        const frames = [];
        animDiv.querySelectorAll('.anim-frame').forEach(frameEl => {
          const img = frameEl.querySelector('.anim-frame-image').value;
          if (img) frames.push({ image: img });
        });
        if (frames.length > 0) anim.frames = frames;

        if (Object.keys(anim).length > 0) attackAnims.push(anim);
      });
      if (attackAnims.length > 0) newUnit.attack_anims = attackAnims;

      // Add or update unit in selected mod (use id-keyed object)
      if (selectedMod) {
        // If editing and id changed, remove old key
        if (selectedUnit && selectedUnit.id && selectedUnit.id !== newUnit.id) {
          delete selectedMod.units[selectedUnit.id];
        }
        console.log('Saving unit:', newUnit);
        selectedMod.units[newUnit.id] = newUnit;
        unitForm.reset();
        document.getElementById('attacksContainer').innerHTML = '';
        document.getElementById('resistanceContainer').innerHTML = '';
        document.getElementById('standingAnimContainer').innerHTML = '';
        document.getElementById('attackAnimsContainer').innerHTML = '';
        attackCounter = 0;
        resistanceCounter = 0;
        selectedUnit = null;
        localStorage.setItem('selectedUnit', null);
        localStorage.setItem('data', JSON.stringify(data));
        showPage('unitsPage');
      }
    });
  }
});

unitAnimDefaultClick = (unit) => {
  if (typeof unit === 'string') {
    unit = unitsData[unit];
  }
  document.getElementById('unitDefaultAnimation').value = unit.id; 
  document.getElementById('unitImage').value = unit.image || '';
  document.getElementById('unitProfile').value = unit.profile || '';
  
  blockText = '';
  if (unit.attack_anim) {
    addToBlockText(unit.attack_anim);
    let attackAnimName = Array.from(new Set(Array.from(blockText.matchAll(/name=*([^\n\r]+)/g)).map(m => m[1])));
    
    document.getElementById('attackTitle').textContent = `⚡ Attacks (with animations for names: ${attackAnimName.join(',') || ''})`;
  }
  if (unit.standing_anim) {
    addToBlockText(unit.standing_anim);
  }
  if (unit.movement_anim) {
    addToBlockText(unit.movement_anim);
  }
}
// Populate unit default animations selection dropdown
const unitAnimInput = document.getElementById('unitDefaultAnimation');
for (const unit of Object.values(unitsData)) {
  const option = document.createElement('option');
  option.value = unit.id;
  option.textContent = unit.id;
  unitAnimInput.appendChild(option);
}
populateModList();
showPage(localStorage.getItem('lastPage') || 'mainPage');